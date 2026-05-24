import random
import re

class RecommendationEngine:
    TOPIC_ALIASES = {
        'python loops': 'loops',
        'loops': 'loops',
        'for loops': 'loops',
        'while loops': 'loops',
        'recursion': 'recursion',
        'machine learning': 'machine learning',
        'ml': 'machine learning',
        'dbms normalization': 'database normalization',
        'normalization': 'database normalization',
        'tcp': 'tcp',
        'udp': 'udp',
        'hashing': 'hashing',
        'dictionary': 'dictionary',
        'list': 'list',
        'tuple': 'tuple',
        'indexing': 'database indexing',
        'database indexing': 'database indexing',
        'sql': 'database indexing',
    }

    STUDY_PLAN_TEMPLATES = [
        "Start with the fundamentals, then build confidence with practice problems and review your mistakes.",
        "Focus on weak topics first, mix in review sessions, and practice with quizzes every other day.",
        "Use short, consistent study sessions to reinforce learning: learn, practice, then reflect."
    ]

    MOTIVATION_TEMPLATES = [
        "Every step forward counts. Keep learning and celebrate small wins!",
        "Your consistency is your advantage. The more you practice, the faster you improve.",
        "Mistakes are proof you're trying. Use them to get stronger, not frustrated.",
        "Learning is a journey, not a race. Stay curious and keep moving forward."
    ]

    GENERAL_TEMPLATES = [
        "I'm your AI tutor, ready to explain concepts, suggest study plans, and help you improve.",
        "I can help you understand topics, track your progress, and give you personalized tips.",
        "Ask me about a topic, a quiz question, or your learning goals, and I'll guide you step-by-step."
    ]

    QUIZ_HELP_TEMPLATES = [
        "If you're unsure why an answer was wrong, review the underlying concept and compare it with the correct choice.",
        "Let's break down the question together. Share the topic or the answer you selected so I can explain it clearly.",
        "Quiz mistakes are a valuable signal. Tell me the question or concept, and I'll help you understand the right reasoning."
    ]

    @staticmethod
    def normalize_topic(text: str) -> str | None:
        if not text:
            return None

        text = text.lower()
        for alias, canonical in RecommendationEngine.TOPIC_ALIASES.items():
            if alias in text:
                return canonical

        # fallback: use phrases after common keywords
        match = re.search(r'\b(explain|teach me|what is|about|tell me about)\s+([a-z0-9\s]+)', text)
        if match:
            raw = match.group(2).strip()
            for alias, canonical in RecommendationEngine.TOPIC_ALIASES.items():
                if alias in raw:
                    return canonical
            return raw

        return None

    @staticmethod
    def build_concept_explanation(topic: str, info: dict) -> str:
        variations = [
            f"**{topic.title()}** is a key concept you should understand clearly. {info['explanation']}",
            f"Here's a friendly explanation of **{topic.title()}**:\n\n{info['explanation']}",
        ]
        response = random.choice(variations)
        response += f"\n\n**Key points:**\n{info['key_points']}\n\n**Example:**\n{info['example']}\n\n✅ Try writing your own example to lock it in."
        return response

    @staticmethod
    def build_study_plan(topic: str | None, weak_topics: list[str], stats_summary: str) -> str:
        if topic:
            plan = (
                f"For **{topic.title()}**, use this plan:\n"
                "• Understand the basic theory\n"
                "• Practice 3-5 example problems\n"
                "• Review mistakes and repeat the concept\n"
                "• Apply it in a short mini-project or quiz"
            )
            return (
                "📘 **Personalized Study Plan**\n\n"
                f"{plan}\n\n"
                f"**Suggested focus:** {topic.title()}\n"
                f"**Why:** {stats_summary}\n\n"
                "Consistency matters most—study in short daily sessions and review your weak points."
            )

        options = ", ".join(topic.title() for topic in weak_topics) if weak_topics else "core concepts"
        template = random.choice(RecommendationEngine.STUDY_PLAN_TEMPLATES)
        return (
            "📘 **Personalized Study Plan**\n\n"
            f"{template}\n\n"
            f"**Focus topics:** {options}\n"
            "**Tip:** Spend 20 minutes learning, 15 minutes practicing, 10 minutes reflecting."
        )

    @staticmethod
    def build_motivation() -> str:
        response = random.choice(RecommendationEngine.MOTIVATION_TEMPLATES)
        return f"💪 **Motivation Boost**\n\n{response}\n\n**Keep going — your next improvement is just one practice session away!"

    @staticmethod
    def build_general_reply() -> str:
        response = random.choice(RecommendationEngine.GENERAL_TEMPLATES)
        return (
            "💬 **AI Learning Assistant**\n\n"
            f"{response}\n\n"
            "Tips to get started:\n"
            "• Ask me to explain a concept\n"
            "• Request a study plan\n"
            "• Ask for performance feedback\n"
            "• Ask for motivation or quiz help"
        )

    @staticmethod
    def build_quiz_help(topic: str | None) -> str:
        if topic:
            return (
                f"🧠 **Quiz Help for {topic.title()}**\n\n"
                "Focus on the concept behind the question first, then compare the answer choices one by one.\n"
                "Check which option matches the definition, which one is a distractor, and which one is technically correct.\n\n"
                "If you'd like, paste the question or the answer choices and I can help you analyze it step by step."
            )

        return (
            "🧠 **Quiz Question Help**\n\n"
            "When an answer feels wrong, I recommend reviewing the underlying concept and then comparing the options.\n"
            "Tell me the question or topic and I will explain where mistakes often happen."
        )

    @staticmethod
    def summarize_performance(stats: list[object]) -> str:
        if not stats:
            return "You haven't completed any quizzes yet. Start with beginner topics and I'll help you build momentum."

        weak_topics = sorted(stats, key=lambda x: x.accuracy)[:3]
        top_topics = sorted(stats, key=lambda x: x.accuracy, reverse=True)[:2]
        weak_list = ', '.join([s.topic for s in weak_topics])
        top_list = ', '.join([s.topic for s in top_topics])
        avg_accuracy = sum(s.accuracy for s in stats) / len(stats)

        return (
            f"Your average accuracy is **{avg_accuracy:.0f}%**. Strong topics include {top_list}. "
            f"Focus on {weak_list} next to improve your overall score."
        )

    @staticmethod
    def extract_last_topic(history: list[dict]) -> str | None:
        for message in reversed(history[-10:]):
            if message.get('role') == 'user':
                topic = RecommendationEngine.normalize_topic(message.get('text', ''))
                if topic:
                    return topic
        return None
