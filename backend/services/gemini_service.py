import os
import logging
import google.generativeai as genai

class GeminiService:
    _initialized = False

    @classmethod
    def init_sdk(cls):
        """Initialize the Gemini SDK with the API key from environment variables."""
        if not cls._initialized:
            api_key = os.getenv("GEMINI_API_KEY")
            if api_key:
                try:
                    genai.configure(api_key=api_key)
                    cls._initialized = True
                    logging.info("Gemini SDK successfully initialized.")
                except Exception as e:
                    logging.error(f"Error configuring Gemini SDK: {str(e)}")
            else:
                logging.warning("GEMINI_API_KEY environment variable is not set. Gemini service will be offline.")

    @classmethod
    def generate_response(cls, message):
        """Generate a response from Gemini for a single message, returning plain text, never crashing."""
        cls.init_sdk()
        if not cls._initialized:
            return "Gemini API key is not configured."
        try:
            model = genai.GenerativeModel('gemini-flash-latest')
            response = model.generate_content(message)
            return response.text.strip()
        except Exception as e:
            logging.error(f"Error in generate_response: {str(e)}")
            return "I'm temporarily unavailable. Please try again shortly."

    @classmethod
    def generate_chat_response(cls, message, history=None, system_instruction=None):
        """
        Generate a response from Gemini given a message, history, and system instruction.
        Tries to use Gemini's built-in chat interface first, falling back to raw prompt generation
        if there are sequencing or SDK issues.
        """
        cls.init_sdk()
        if not cls._initialized:
            return "I'm temporarily unavailable. Please configure the Gemini API key."

        # Use gemini-flash-latest as the latest stable general-purpose model
        model_name = 'gemini-flash-latest'
        
        try:
            # We construct a configuration with system instructions if supported
            config = {}
            
            # Translate history to Gemini format: list of dicts with 'role' and 'parts'
            formatted_history = []
            if history:
                for msg in history:
                    # Role mapping: 'user' -> 'user', everything else -> 'model'
                    role = msg.get('role')
                    if not role:
                        role = 'user' if msg.get('type') == 'user' else 'model'
                    elif role in ['assistant', 'bot', 'system']:
                        role = 'model'
                    
                    text = msg.get('text') or msg.get('content') or ""
                    if text:
                        formatted_history.append({
                            'role': role,
                            'parts': [text]
                        })

            # Check if there's any history to load into the chat.
            # To avoid ordering/sequencing validation errors in start_chat (e.g. consecutive user turns),
            # we will use chat only if the roles strictly alternate and start with user.
            valid_sequence = True
            if formatted_history:
                last_role = None
                for i, content in enumerate(formatted_history):
                    role = content['role']
                    if i == 0 and role != 'user':
                        valid_sequence = False
                        break
                    if last_role and role == last_role:
                        valid_sequence = False
                        break
                    last_role = role

            if valid_sequence:
                try:
                    # Initialize the model with system instruction if provided
                    if system_instruction:
                        model = genai.GenerativeModel(model_name=model_name, system_instruction=system_instruction)
                    else:
                        model = genai.GenerativeModel(model_name=model_name)

                    chat = model.start_chat(history=formatted_history)
                    response = chat.send_message(message)
                    return response.text
                except Exception as chat_err:
                    logging.warning(f"Gemini start_chat failed: {str(chat_err)}. Falling back to generate_content.")
                    valid_sequence = False

            # Fallback: compile the entire system instruction and history into a single structured prompt
            if not valid_sequence:
                prompt_parts = []
                if system_instruction:
                    prompt_parts.append(f"System Persona & Context:\n{system_instruction}\n")
                
                if history:
                    prompt_parts.append("Conversation History:")
                    for msg in history:
                        role_label = "User" if msg.get('role') == 'user' or msg.get('type') == 'user' else "AI Tutor"
                        text = msg.get('text') or msg.get('content') or ""
                        if text:
                            prompt_parts.append(f"{role_label}: {text}")
                
                prompt_parts.append(f"User: {message}")
                prompt_parts.append("AI Tutor:")
                
                full_prompt = "\n\n".join(prompt_parts)
                model = genai.GenerativeModel(model_name=model_name)
                response = model.generate_content(full_prompt)
                return response.text

        except Exception as e:
            import traceback
            traceback.print_exc()
            logging.error(f"Failed to generate response from Gemini: {str(e)}")
            return f"I'm temporarily unavailable. Gemini API error: {str(e)}"
