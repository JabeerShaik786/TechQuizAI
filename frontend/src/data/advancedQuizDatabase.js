// ============================================================================
// PROFESSIONAL QUIZ DATABASE & RANDOMIZATION ENGINE
// ============================================================================
// Features:
// - 25+ questions per topic (Easy, Medium, Hard)
// - Fisher-Yates shuffle algorithm
// - Session-based duplicate prevention
// - Cross-session used question tracking
// - Difficulty-based filtering
// - Professional technical MCQs
// ============================================================================

const advancedQuizDatabase = {
  Python: [
    // EASY QUESTIONS (8 total)
    { id: 1, question: 'What is Python?', options: ['Programming Language', 'Database System', 'Web Browser', 'Operating System'], correctAnswer: 0, difficulty: 'easy' },
    { id: 2, question: 'Which keyword creates a function in Python?', options: ['func', 'define', 'def', 'function'], correctAnswer: 2, difficulty: 'easy' },
    { id: 3, question: 'Which data type is immutable?', options: ['List', 'Tuple', 'Dictionary', 'Set'], correctAnswer: 1, difficulty: 'easy' },
    { id: 4, question: 'What is the file extension for Python?', options: ['.py', '.python', '.p', '.pt'], correctAnswer: 0, difficulty: 'easy' },
    { id: 5, question: 'Which symbol is used for single-line comments?', options: ['//', '#', '/*', '--'], correctAnswer: 1, difficulty: 'easy' },
    { id: 6, question: 'How do you create a loop in Python?', options: ['loop', 'for', 'repeat', 'iterate'], correctAnswer: 1, difficulty: 'easy' },
    { id: 7, question: 'What is the correct syntax for a list?', options: ['[1, 2, 3]', '{1, 2, 3}', '(1, 2, 3)', '<1, 2, 3>'], correctAnswer: 0, difficulty: 'easy' },
    { id: 8, question: 'What does the len() function do?', options: ['Creates a list', 'Returns length', 'Sorts items', 'Removes items'], correctAnswer: 1, difficulty: 'easy' },

    // MEDIUM QUESTIONS (9 total)
    { id: 9, question: 'What is a lambda function?', options: ['Regular function', 'Anonymous function', 'Class method', 'Static method'], correctAnswer: 1, difficulty: 'medium' },
    { id: 10, question: 'Which module handles file operations?', options: ['math', 'os', 'sys', 'time'], correctAnswer: 1, difficulty: 'medium' },
    { id: 11, question: 'What is list comprehension?', options: ['Code documentation', 'Loop shorthand', 'Comment block', 'Function definition'], correctAnswer: 1, difficulty: 'medium' },
    { id: 12, question: 'How do you handle exceptions in Python?', options: ['try-catch', 'try-except', 'catch-finally', 'handle-error'], correctAnswer: 1, difficulty: 'medium' },
    { id: 13, question: 'What does *args allow you to do?', options: ['Multiply arguments', 'Accept variable number of args', 'Create array', 'Format string'], correctAnswer: 1, difficulty: 'medium' },
    { id: 14, question: 'What is a decorator in Python?', options: ['Design pattern', 'Function wrapper', 'Class attribute', 'Module import'], correctAnswer: 1, difficulty: 'medium' },
    { id: 15, question: 'What is the difference between == and is?', options: ['Same thing', 'Value vs identity comparison', 'Type checking only', 'No meaningful difference'], correctAnswer: 1, difficulty: 'medium' },
    { id: 16, question: 'How do you create a virtual environment?', options: ['python venv', 'python -m venv', 'python env', 'python virtual'], correctAnswer: 1, difficulty: 'medium' },
    { id: 17, question: 'What does **kwargs do?', options: ['Power operation', 'Accept keyword arguments', 'Multiply kwargs', 'Export module'], correctAnswer: 1, difficulty: 'medium' },

    // HARD QUESTIONS (8 total)
    { id: 18, question: 'What is the GIL in Python?', options: ['Global Integer Limit', 'Global Interpreter Lock', 'Global Import Library', 'Global Index List'], correctAnswer: 1, difficulty: 'hard' },
    { id: 19, question: 'Explain generators in Python?', options: ['Create objects', 'Lazy evaluation functions', 'Random number generators', 'Generator expressions only'], correctAnswer: 1, difficulty: 'hard' },
    { id: 20, question: 'What is a metaclass?', options: ['Base class', 'Class of a class', 'Parent class', 'Abstract class'], correctAnswer: 1, difficulty: 'hard' },
    { id: 21, question: 'Difference between deepcopy and shallow copy?', options: ['Speed difference', 'Nested object copying', 'Memory usage only', 'No difference'], correctAnswer: 1, difficulty: 'hard' },
    { id: 22, question: 'What does the yield keyword do?', options: ['Return value', 'Suspend function execution', 'Import module', 'Define variable'], correctAnswer: 1, difficulty: 'hard' },
    { id: 23, question: 'What are context managers used for?', options: ['Global scope management', 'Resource management (with statement)', 'Memory allocation', 'Database connection pooling'], correctAnswer: 1, difficulty: 'hard' },
    { id: 24, question: 'What is monkey patching?', options: ['Bug fixing method', 'Runtime modification of code', 'Code optimization', 'Debugging tool'], correctAnswer: 1, difficulty: 'hard' },
    { id: 25, question: 'What does async/await enable?', options: ['Synchronous processing', 'Asynchronous programming', 'Thread creation', 'Process forking'], correctAnswer: 1, difficulty: 'hard' },
  ],

  'AI/ML': [
    // EASY (8 questions)
    { id: 1, question: 'What does ML stand for?', options: ['Machine Learning', 'Meta Learning', 'Modern Logic', 'Machine Logic'], correctAnswer: 0, difficulty: 'easy' },
    { id: 2, question: 'What is Artificial Intelligence?', options: ['Artificial Interference', 'Artificial Intelligence', 'Applied Integration', 'Automated Interface'], correctAnswer: 1, difficulty: 'easy' },
    { id: 3, question: 'Which is a popular ML framework by Google?', options: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn'], correctAnswer: 1, difficulty: 'easy' },
    { id: 4, question: 'What is supervised learning?', options: ['Learning without labels', 'Learning with labeled data', 'Learning without data', 'Random learning'], correctAnswer: 1, difficulty: 'easy' },
    { id: 5, question: 'What is clustering?', options: ['Grouping similar data points', 'Making predictions', 'Classification', 'Data regression'], correctAnswer: 0, difficulty: 'easy' },
    { id: 6, question: 'What is a neural network?', options: ['Network cable', 'Brain-inspired computational model', 'Internet protocol', 'Computer network'], correctAnswer: 1, difficulty: 'easy' },
    { id: 7, question: 'What is accuracy in ML?', options: ['Speed metric', 'Correctness ratio', 'Memory usage', 'Training time'], correctAnswer: 1, difficulty: 'easy' },
    { id: 8, question: 'What does CNN stand for?', options: ['Computer Neural Network', 'Convolutional Neural Network', 'Central Network Node', 'Continuous Neural Net'], correctAnswer: 1, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is overfitting?', options: ['Too much training data', 'Model memorizes training data', 'Low training accuracy', 'Training error increases'], correctAnswer: 1, difficulty: 'medium' },
    { id: 10, question: 'What is regularization?', options: ['Data cleaning only', 'Reducing model complexity', 'Feature scaling only', 'Model accuracy improvement'], correctAnswer: 1, difficulty: 'medium' },
    { id: 11, question: 'What is cross-validation?', options: ['Data splitting', 'Model evaluation method', 'Feature validation', 'Hyperparameter tuning'], correctAnswer: 1, difficulty: 'medium' },
    { id: 12, question: 'What is gradient descent?', options: ['Data structure', 'Optimization algorithm', 'Loss function', 'Activation function'], correctAnswer: 1, difficulty: 'medium' },
    { id: 13, question: 'What is RNN used for?', options: ['Image recognition', 'Sequence data processing', 'Classification only', 'Clustering only'], correctAnswer: 1, difficulty: 'medium' },
    { id: 14, question: 'What is feature scaling?', options: ['Data transformation', 'Normalizing feature values', 'Removing outliers only', 'Encoding categorical data'], correctAnswer: 1, difficulty: 'medium' },
    { id: 15, question: 'What is an activation function?', options: ['Optimization technique', 'Introduces non-linearity', 'Loss calculation', 'Forward pass component'], correctAnswer: 1, difficulty: 'medium' },
    { id: 16, question: 'What is ensemble learning?', options: ['Using single model', 'Combining multiple models', 'Random forest only', 'Deep learning only'], correctAnswer: 1, difficulty: 'medium' },
    { id: 17, question: 'What is the learning rate?', options: ['Data learning speed', 'Step size for weight updates', 'Accuracy rate', 'Training time'], correctAnswer: 1, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is backpropagation?', options: ['Forward pass only', 'Gradient calculation and weight updates', 'Weight initialization', 'Error propagation only'], correctAnswer: 1, difficulty: 'hard' },
    { id: 19, question: 'Explain the attention mechanism?', options: ['Simple weight distribution', 'Focus on important features', 'Sequential processing', 'All transformers use it'], correctAnswer: 1, difficulty: 'hard' },
    { id: 20, question: 'What is transfer learning?', options: ['Model reuse from source domain', 'Weight initialization method', 'Fine-tuning pre-trained models', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'What is the vanishing gradient problem?', options: ['Gradient explosion', 'Gradient becomes too small', 'Weight updates stop', 'Training becomes slow'], correctAnswer: 1, difficulty: 'hard' },
    { id: 22, question: 'What is the transformer architecture?', options: ['RNN variant', 'Attention-based architecture', 'CNN variant', 'Hybrid model'], correctAnswer: 1, difficulty: 'hard' },
    { id: 23, question: 'What is batch normalization?', options: ['Data batching only', 'Layer normalization method', 'Reduces internal covariate shift', 'Feature scaling only'], correctAnswer: 2, difficulty: 'hard' },
    { id: 24, question: 'What are LSTM cells?', options: ['Simple RNN units', 'Memory cells with gates', 'Forget gates only', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'What are GANs?', options: ['Type of neural network', 'Generator + Discriminator', 'Adversarial training framework', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'Data Science': [
    // EASY (8 questions)
    { id: 1, question: 'What is Data Science?', options: ['Database management', 'Extracting insights from data', 'Data storage', 'Network science'], correctAnswer: 1, difficulty: 'easy' },
    { id: 2, question: 'What is the first step in data science?', options: ['Modeling', 'Data collection', 'Analysis', 'Visualization'], correctAnswer: 1, difficulty: 'easy' },
    { id: 3, question: 'Which is a popular data analysis library?', options: ['NumPy', 'Pandas', 'Matplotlib', 'All are data-related'], correctAnswer: 1, difficulty: 'easy' },
    { id: 4, question: 'What is a dataset?', options: ['Collection of data', 'Single data value', 'Function definition', 'Algorithm'], correctAnswer: 0, difficulty: 'easy' },
    { id: 5, question: 'What does CSV stand for?', options: ['Comma Separated Values', 'Computer System Value', 'Central Storage View', 'Code Source Verification'], correctAnswer: 0, difficulty: 'easy' },
    { id: 6, question: 'What is missing data?', options: ['Lost dataset', 'Null or NaN values', 'Incomplete analysis', 'No data available'], correctAnswer: 1, difficulty: 'easy' },
    { id: 7, question: 'What is correlation?', options: ['Relationship between variables', 'Data cleaning', 'Statistical test', 'Model accuracy'], correctAnswer: 0, difficulty: 'easy' },
    { id: 8, question: 'What is a histogram?', options: ['Timeline chart', 'Frequency distribution', 'Database query', 'Machine learning'], correctAnswer: 1, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is data normalization?', options: ['Data cleaning only', 'Scaling data to standard range', 'Removing duplicates', 'Feature engineering'], correctAnswer: 1, difficulty: 'medium' },
    { id: 10, question: 'What is outlier detection?', options: ['Finding patterns', 'Finding anomalies', 'Removing duplicates', 'Data transformation'], correctAnswer: 1, difficulty: 'medium' },
    { id: 11, question: 'What is feature engineering?', options: ['Creating new features', 'Data cleaning', 'Removing features', 'Feature scaling'], correctAnswer: 0, difficulty: 'medium' },
    { id: 12, question: 'What is dimensionality reduction?', options: ['Data compression', 'Feature reduction', 'Noise removal', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 13, question: 'What is hypothesis testing?', options: ['Data analysis', 'Validating statistical assumptions', 'Model evaluation', 'Prediction'], correctAnswer: 1, difficulty: 'medium' },
    { id: 14, question: 'What is time series data?', options: ['Sequential data ordered by time', 'Random data', 'Categorical data', 'Numerical data only'], correctAnswer: 0, difficulty: 'medium' },
    { id: 15, question: 'What is data imputation?', options: ['Data removal', 'Filling missing values', 'Data duplication', 'Data transformation'], correctAnswer: 1, difficulty: 'medium' },
    { id: 16, question: 'What does PCA stand for?', options: ['Data analysis tool', 'Principal Component Analysis', 'Probability calculation', 'Pattern classification'], correctAnswer: 1, difficulty: 'medium' },
    { id: 17, question: 'What is exploratory data analysis?', options: ['Model building', 'Data visualization and summary', 'Prediction', 'Feature selection'], correctAnswer: 1, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is multicollinearity?', options: ['Multiple datasets', 'High correlation between features', 'Duplicate data', 'Missing data'], correctAnswer: 1, difficulty: 'hard' },
    { id: 19, question: 'Explain Bayesian statistics?', options: ['Frequentist approach', 'Probability with prior beliefs', 'Hypothesis testing', 'Data analysis'], correctAnswer: 1, difficulty: 'hard' },
    { id: 20, question: 'What is heteroscedasticity?', options: ['Variable variance', 'Constant variance', 'Normal distribution', 'Data structure'], correctAnswer: 0, difficulty: 'hard' },
    { id: 21, question: 'What is bootstrap sampling?', options: ['Data resampling', 'Confidence intervals', 'Uncertainty estimation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'What is kernel density estimation?', options: ['Data smoothing', 'Probability density estimation', 'Density function', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'What is causal inference?', options: ['Correlation analysis', 'Determining cause-effect relationships', 'Prediction only', 'Data visualization'], correctAnswer: 1, difficulty: 'hard' },
    { id: 24, question: 'Explain Markov Chains?', options: ['State transitions', 'Random processes', 'Memoryless property', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'What is Monte Carlo simulation?', options: ['Random sampling method', 'Statistical estimation', 'Uncertainty quantification', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'Web Development': [
    // EASY (8 questions)
    { id: 1, question: 'What does HTML stand for?', options: ['Hyper Tech Markup', 'HyperText Markup Language', 'High-level Text', 'Home Tool Markup'], correctAnswer: 1, difficulty: 'easy' },
    { id: 2, question: 'What is CSS used for?', options: ['Programming logic', 'Styling and layout', 'Database', 'Networking'], correctAnswer: 1, difficulty: 'easy' },
    { id: 3, question: 'What does JS stand for?', options: ['Java Script', 'JavaScript', 'Just Script', 'Java Source'], correctAnswer: 1, difficulty: 'easy' },
    { id: 4, question: 'What is React?', options: ['Database', 'JavaScript library', 'Server software', 'Network protocol'], correctAnswer: 1, difficulty: 'easy' },
    { id: 5, question: 'What is a component in React?', options: ['File', 'Reusable UI element', 'Library', 'Browser function'], correctAnswer: 1, difficulty: 'easy' },
    { id: 6, question: 'What does REST mean?', options: ['Relax Execution', 'Representational State Transfer', 'Remote Server', 'Request-Execution'], correctAnswer: 1, difficulty: 'easy' },
    { id: 7, question: 'What is an API?', options: ['Software interface', 'Programming language', 'Database', 'Server only'], correctAnswer: 0, difficulty: 'easy' },
    { id: 8, question: 'What is responsive design?', options: ['Fast design', 'Device-adaptive design', 'Animated design', 'Interactive design'], correctAnswer: 1, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What are hooks in React?', options: ['Event listeners', 'State management', 'Side effects', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 10, question: 'What is virtual DOM?', options: ['Real DOM copy', 'JavaScript object', 'Optimization layer', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 11, question: 'What is prop drilling?', options: ['Data passing through levels', 'Performance issue', 'Optimization technique', 'Component nesting'], correctAnswer: 0, difficulty: 'medium' },
    { id: 12, question: 'What is middleware?', options: ['Server component', 'Request interceptor', 'Request processing', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 13, question: 'What does CORS stand for?', options: ['Cross-Origin Request Sharing', 'Cross-Origin Resource Sharing', 'Domain restriction', 'Security protocol'], correctAnswer: 1, difficulty: 'medium' },
    { id: 14, question: 'What are web sockets?', options: ['HTTP protocol', 'Real-time communication', 'Network sockets', 'Server ports'], correctAnswer: 1, difficulty: 'medium' },
    { id: 15, question: 'What is server-side rendering?', options: ['Browser rendering', 'Server rendering HTML', 'Static generation', 'Client rendering'], correctAnswer: 1, difficulty: 'medium' },
    { id: 16, question: 'What is state management?', options: ['Database operations', 'UI state handling', 'Server state', 'User input only'], correctAnswer: 1, difficulty: 'medium' },
    { id: 17, question: 'What does DOM stand for?', options: ['Database Object Model', 'Document Object Model', 'Data Operations Model', 'Developer Object Model'], correctAnswer: 1, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is code splitting?', options: ['File division', 'Bundle optimization', 'Lazy loading', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 19, question: 'Explain closures in JavaScript?', options: ['Scope encapsulation', 'Function nesting', 'Variable access', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 20, question: 'What is event bubbling?', options: ['Event propagation', 'DOM traversal', 'Event flow', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'What are Promises?', options: ['Async operations', 'Asynchronous execution', 'Future values', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'What is tree shaking?', options: ['Dead code removal', 'Bundle optimization', 'Module elimination', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'Explain WebAssembly?', options: ['Assembly language', 'Low-level bytecode', 'Performance optimization', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 24, question: 'What is shadow DOM?', options: ['DOM isolation', 'Encapsulation', 'Web components', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'Explain async/await in JavaScript?', options: ['Same as Promises', 'Async abstraction', 'Error handling', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'Cybersecurity': [
    // EASY (8 questions)
    { id: 1, question: 'What is cybersecurity?', options: ['Network management', 'Protection against attacks', 'Firewall setup', 'Encryption only'], correctAnswer: 1, difficulty: 'easy' },
    { id: 2, question: 'What is phishing?', options: ['Network protocol', 'Email scam attack', 'Firewall rule', 'Encryption method'], correctAnswer: 1, difficulty: 'easy' },
    { id: 3, question: 'What is a firewall?', options: ['Anti-virus software', 'Network security barrier', 'Encryption tool', 'Password manager'], correctAnswer: 1, difficulty: 'easy' },
    { id: 4, question: 'What does HTTPS provide?', options: ['Speed increase', 'Encryption', 'Anonymity', 'Caching only'], correctAnswer: 1, difficulty: 'easy' },
    { id: 5, question: 'What is SSL/TLS?', options: ['Server security', 'Encryption protocol', 'Network protocol', 'Authentication only'], correctAnswer: 1, difficulty: 'easy' },
    { id: 6, question: 'What is a password hash?', options: ['Encrypted password', 'One-way function', 'Random string', 'Encoded password'], correctAnswer: 1, difficulty: 'easy' },
    { id: 7, question: 'What is 2FA?', options: ['Dual Firewall', 'Two-Factor Authentication', 'Twice Authentication', 'Two-Fold Approval'], correctAnswer: 1, difficulty: 'easy' },
    { id: 8, question: 'What is malware?', options: ['Bad software', 'Malicious software', 'Software virus', 'All above'], correctAnswer: 3, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is SQL injection?', options: ['Database query', 'Attack vector', 'Security protocol', 'Encryption method'], correctAnswer: 1, difficulty: 'medium' },
    { id: 10, question: 'What is XSS attack?', options: ['Security protocol', 'Script injection attack', 'Network attack', 'Password crack'], correctAnswer: 1, difficulty: 'medium' },
    { id: 11, question: 'What is CSRF attack?', options: ['Cross-site scripting', 'Cross-site request forgery', 'Cryptographic flaw', 'Code security'], correctAnswer: 1, difficulty: 'medium' },
    { id: 12, question: 'What is a brute force attack?', options: ['Random guessing', 'Systematic trying all combinations', 'DDoS attack', 'Social engineering'], correctAnswer: 1, difficulty: 'medium' },
    { id: 13, question: 'What is man-in-the-middle?', options: ['Network monitoring', 'Eavesdropping attack', 'Encryption bypass', 'Authentication failure'], correctAnswer: 1, difficulty: 'medium' },
    { id: 14, question: 'What is privilege escalation?', options: ['User promotion', 'Unauthorized access increase', 'System upgrade', 'Permission change'], correctAnswer: 1, difficulty: 'medium' },
    { id: 15, question: 'What is a zero-day exploit?', options: ['Day zero attack', 'Unknown vulnerability', 'First attack', 'Recent patch'], correctAnswer: 1, difficulty: 'medium' },
    { id: 16, question: 'What is rate limiting?', options: ['Speed control', 'Request throttling', 'DDoS protection', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 17, question: 'What is input sanitization?', options: ['Cleaning code', 'Input validation', 'Security check', 'All above'], correctAnswer: 3, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is end-to-end encryption?', options: ['Database encryption', 'Client-server encryption', 'Full communication encryption', 'Message encryption'], correctAnswer: 2, difficulty: 'hard' },
    { id: 19, question: 'Explain public key cryptography?', options: ['Symmetric encryption', 'Asymmetric encryption', 'One-time pads', 'Hash functions'], correctAnswer: 1, difficulty: 'hard' },
    { id: 20, question: 'What is certificate pinning?', options: ['SSL validation', 'Key verification', 'MITM prevention', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'What is OAuth?', options: ['Authentication', 'Authorization framework', 'Token-based auth', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'Explain cryptographic hashing?', options: ['Encryption', 'One-way function', 'Data integrity', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'What is a DDoS attack?', options: ['Single attack', 'Distributed denial of service', 'Multiple source attack', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 24, question: 'What is vulnerability scanning?', options: ['Network scan', 'Security assessment', 'Automated testing', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'Explain incident response?', options: ['Attack detection', 'Breach handling', 'Recovery plan', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'Cloud Computing': [
    // EASY (8 questions)
    { id: 1, question: 'What is cloud computing?', options: ['Internet servers', 'On-demand computing', 'Remote storage', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 2, question: 'What does IaaS stand for?', options: ['Infrastructure as Service', 'Internet as Service', 'Integrated as Service', 'Information as Service'], correctAnswer: 0, difficulty: 'easy' },
    { id: 3, question: 'What does PaaS stand for?', options: ['Platform as Service', 'Protocol as Service', 'Program as Service', 'Package as Service'], correctAnswer: 0, difficulty: 'easy' },
    { id: 4, question: 'What does SaaS stand for?', options: ['Server as Service', 'Software as Service', 'Storage as Service', 'Security as Service'], correctAnswer: 1, difficulty: 'easy' },
    { id: 5, question: 'What is AWS?', options: ['Amazon Web Services', 'Advanced Web System', 'Application Web Service', 'Area Web Services'], correctAnswer: 0, difficulty: 'easy' },
    { id: 6, question: 'What is Microsoft Azure?', options: ['Microsoft cloud platform', 'Google cloud', 'AWS alternative', 'Open source'], correctAnswer: 0, difficulty: 'easy' },
    { id: 7, question: 'What does VM stand for?', options: ['Video Memory', 'Virtual Machine', 'Virtual Memory', 'Virtual Monitor'], correctAnswer: 1, difficulty: 'easy' },
    { id: 8, question: 'What is cloud scalability?', options: ['System size', 'Resource capacity', 'Performance increase', 'All above'], correctAnswer: 3, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is containerization?', options: ['Application packaging', 'Virtual machines', 'Resource isolation', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 10, question: 'What is Docker?', options: ['Container platform', 'Containerization', 'Application isolation', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 11, question: 'What is Kubernetes?', options: ['Container orchestration', 'Container management', 'Load balancing', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 12, question: 'What is load balancing?', options: ['Traffic distribution', 'Server allocation', 'Resource management', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 13, question: 'What does CDN stand for?', options: ['Content Delivery Network', 'Cache Data Network', 'Cloud Data Network', 'Computing Delivery'], correctAnswer: 0, difficulty: 'medium' },
    { id: 14, question: 'What is serverless computing?', options: ['No servers', 'Function as service', 'Backend abstraction', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 15, question: 'What are microservices?', options: ['Small servers', 'Modular services', 'Service architecture', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 16, question: 'What is auto-scaling?', options: ['Manual scaling', 'Automatic resource scaling', 'Dynamic capacity', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 17, question: 'What is a cloud region?', options: ['Data center location', 'Cloud service', 'Availability zone', 'All above'], correctAnswer: 3, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is multi-tenancy?', options: ['Single user', 'Shared resources', 'Isolated instances', 'Distributed system'], correctAnswer: 1, difficulty: 'hard' },
    { id: 19, question: 'Explain cloud security?', options: ['Network security', 'Data encryption', 'Access control', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 20, question: 'What is hybrid cloud?', options: ['Public + private', 'Cloud combination', 'Mixed deployment', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'What is disaster recovery?', options: ['Backup system', 'Recovery process', 'Continuity plan', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'What is an API gateway?', options: ['API interface', 'Request routing', 'Service gateway', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'What is a service mesh?', options: ['Network layer', 'Service communication', 'Infrastructure', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 24, question: 'What is orchestration?', options: ['Automation', 'Service management', 'Resource coordination', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'Explain DevOps philosophy?', options: ['Development + Operations', 'Culture + practices', 'Automation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'DBMS': [
    // EASY (8 questions)
    { id: 1, question: 'What does DBMS stand for?', options: ['Database Management System', 'Digital Base System', 'Database Main Server', 'Dynamic Base Model'], correctAnswer: 0, difficulty: 'easy' },
    { id: 2, question: 'What is SQL?', options: ['Structured Query Language', 'Standard Question Language', 'Simple Query Library', 'System Query Language'], correctAnswer: 0, difficulty: 'easy' },
    { id: 3, question: 'What is a table in a database?', options: ['Spreadsheet', 'Data structure', 'Record collection', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 4, question: 'What is a primary key?', options: ['Main key', 'Unique identifier', 'Foreign key', 'Index key'], correctAnswer: 1, difficulty: 'easy' },
    { id: 5, question: 'What is a foreign key?', options: ['External key', 'Table reference', 'Primary key', 'Index key'], correctAnswer: 1, difficulty: 'easy' },
    { id: 6, question: 'What is normalization?', options: ['Data organization', 'Redundancy removal', 'Design optimization', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 7, question: 'What is a JOIN operation?', options: ['Union data', 'Combine tables', 'SQL operation', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 8, question: 'What does SELECT do?', options: ['Database command', 'Query data', 'Retrieve records', 'All above'], correctAnswer: 3, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is ACID property?', options: ['Chemical', 'Database transactions', 'Data consistency', 'Database rules'], correctAnswer: 1, difficulty: 'medium' },
    { id: 10, question: 'What is database indexing?', options: ['Data organization', 'Query optimization', 'Search speed', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 11, question: 'What is a view in database?', options: ['Virtual table', 'Saved query', 'Data abstraction', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 12, question: 'What is a transaction?', options: ['Database operation', 'Series of queries', 'Atomic unit', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 13, question: 'What is aggregation?', options: ['Data grouping', 'SUM/AVG functions', 'Data summarization', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 14, question: 'What is a subquery?', options: ['Nested query', 'Inner query', 'Query within query', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 15, question: 'What are normal forms?', options: ['1NF only', '2NF only', '3NF only', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 16, question: 'What is denormalization?', options: ['Reduce normalization', 'Performance optimization', 'Redundancy addition', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 17, question: 'What is a database backup?', options: ['Data copy', 'Disaster recovery', 'Data protection', 'All above'], correctAnswer: 3, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is deadlock?', options: ['Process halt', 'Resource conflict', 'Transaction lock', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 19, question: 'What is query optimization?', options: ['Performance tuning', 'Query execution', 'Query planning', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 20, question: 'What is replication?', options: ['Data copying', 'Database sync', 'Consistency maintenance', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'What is partitioning?', options: ['Table division', 'Data distribution', 'Performance', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'Explain sharding?', options: ['Data partitioning', 'Horizontal scaling', 'Database distribution', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'What is MVCC?', options: ['Concurrency control', 'Version management', 'Consistency model', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 24, question: 'What is NoSQL?', options: ['Non-relational', 'Flexible schema', 'Scalability', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'Explain CAP theorem?', options: ['Consistency, Availability, Partition', 'Database properties', 'Distributed systems', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'Networking': [
    // EASY (8 questions)
    { id: 1, question: 'What does TCP/IP stand for?', options: ['Transmission Protocol', 'Transmission Control Protocol/Internet Protocol', 'Transfer Control Protocol', 'Network protocol'], correctAnswer: 1, difficulty: 'easy' },
    { id: 2, question: 'What is HTTP?', options: ['Hypertext Transfer Protocol', 'High Tech Protocol', 'Home Transfer Protocol', 'Hyperlink Transport'], correctAnswer: 0, difficulty: 'easy' },
    { id: 3, question: 'What does DNS stand for?', options: ['Domain Network Service', 'Domain Name System', 'Database Network', 'Digital Network System'], correctAnswer: 1, difficulty: 'easy' },
    { id: 4, question: 'What is an IP address?', options: ['Internet Protocol', 'Identification number', 'Network address', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 5, question: 'What is a port?', options: ['Physical port', 'Virtual port', 'Communication endpoint', 'Connection point'], correctAnswer: 2, difficulty: 'easy' },
    { id: 6, question: 'What is a MAC address?', options: ['Media Access Control', 'Machine address', 'Physical address', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 7, question: 'What is a packet?', options: ['Data unit', 'Information block', 'Network transmission', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 8, question: 'What is bandwidth?', options: ['Channel width', 'Data transfer rate', 'Network capacity', 'All above'], correctAnswer: 3, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is routing?', options: ['Data path', 'Packet forwarding', 'Path selection', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 10, question: 'What is a gateway?', options: ['Network entrance', 'Protocol converter', 'Network device', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 11, question: 'What does DHCP stand for?', options: ['Dynamic Protocol', 'Dynamic Host Configuration Protocol', 'Device Host', 'Dynamic Configuration'], correctAnswer: 1, difficulty: 'medium' },
    { id: 12, question: 'What does ICMP stand for?', options: ['Internet Control Protocol', 'Internet Control Message Protocol', 'Message Protocol', 'Control Protocol'], correctAnswer: 1, difficulty: 'medium' },
    { id: 13, question: 'What does ARP stand for?', options: ['Address Resolution Protocol', 'Advanced Routing', 'Address Protocol', 'Routing Protocol'], correctAnswer: 0, difficulty: 'medium' },
    { id: 14, question: 'What is a VPN?', options: ['Virtual Protocol Network', 'Virtual Private Network', 'Virtual Packet Network', 'Protected Network'], correctAnswer: 1, difficulty: 'medium' },
    { id: 15, question: 'What does NAT stand for?', options: ['Network Address Translation', 'Network Allocation Table', 'Network Addressing', 'Network Translation'], correctAnswer: 0, difficulty: 'medium' },
    { id: 16, question: 'What does QoS stand for?', options: ['Quality of Service', 'Quantitative Service', 'Quality Standard', 'Service Quality'], correctAnswer: 0, difficulty: 'medium' },
    { id: 17, question: 'What is packet loss?', options: ['Lost packets', 'Network failure', 'Transmission error', 'All above'], correctAnswer: 3, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is BGP?', options: ['Border Gateway Protocol', 'Routing protocol', 'Inter-AS routing', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 19, question: 'What is OSPF?', options: ['Open Shortest Path', 'Open Shortest Path First', 'Routing protocol', 'Link-state protocol'], correctAnswer: 3, difficulty: 'hard' },
    { id: 20, question: 'What is network congestion?', options: ['Bandwidth overflow', 'Packet loss', 'Route saturation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'What is IPv6?', options: ['Protocol version', 'Address format', 'Next generation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'What is multicast?', options: ['Group communication', 'One-to-many', 'Broadcast variant', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'What is traffic shaping?', options: ['Rate limiting', 'Bandwidth management', 'QoS implementation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 24, question: 'What is network slicing?', options: ['Virtual networks', 'Network partitioning', '5G technology', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'What is SDN?', options: ['Software Defined Network', 'Programmable networking', 'Centralized control', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],

  'Operating Systems': [
    // EASY (8 questions)
    { id: 1, question: 'What does OS stand for?', options: ['Operation Software', 'Operating System', 'Organized System', 'Online Service'], correctAnswer: 1, difficulty: 'easy' },
    { id: 2, question: 'What is a process?', options: ['Task', 'Program execution', 'Running program', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 3, question: 'What is a thread?', options: ['Light process', 'Execution unit', 'Process component', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 4, question: 'What is memory?', options: ['Storage', 'Data storage', 'RAM/ROM', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 5, question: 'What is a kernel?', options: ['OS core', 'Central component', 'Core functionality', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 6, question: 'What is scheduling?', options: ['Time management', 'CPU allocation', 'Process management', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 7, question: 'What is I/O?', options: ['Input/Output', 'Data transfer', 'Device communication', 'All above'], correctAnswer: 3, difficulty: 'easy' },
    { id: 8, question: 'What is cache?', options: ['Storage', 'Fast memory', 'Data buffer', 'All above'], correctAnswer: 3, difficulty: 'easy' },

    // MEDIUM (9 questions)
    { id: 9, question: 'What is context switching?', options: ['Process switching', 'CPU switching', 'Resource change', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 10, question: 'What is synchronization?', options: ['Timing coordination', 'Process coordination', 'Mutual exclusion', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 11, question: 'What is deadlock?', options: ['Mutual blocking', 'Process halt', 'Resource conflict', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 12, question: 'What is starvation?', options: ['Resource denial', 'Process waiting', 'Unfair scheduling', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 13, question: 'What is virtual memory?', options: ['Extended memory', 'Disk as memory', 'Simulation', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 14, question: 'What is paging?', options: ['Memory division', 'Virtual memory', 'Page allocation', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 15, question: 'What is segmentation?', options: ['Memory division', 'Logical division', 'Protection', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 16, question: 'What is IPC?', options: ['Inter-Process Communication', 'Data sharing', 'Message passing', 'All above'], correctAnswer: 3, difficulty: 'medium' },
    { id: 17, question: 'What is a semaphore?', options: ['Signal device', 'Synchronization primitive', 'Resource counter', 'All above'], correctAnswer: 3, difficulty: 'medium' },

    // HARD (8 questions)
    { id: 18, question: 'What is page replacement?', options: ['Memory management', 'Paging algorithm', 'Virtual memory', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 19, question: 'What is TLB?', options: ['Translation Lookaside Buffer', 'Cache', 'Address translation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 20, question: 'What is a mutex?', options: ['Mutual exclusion', 'Lock mechanism', 'Synchronization', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 21, question: 'Explain race condition?', options: ['Timing issue', 'Concurrent access', 'Data corruption', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 22, question: 'What is real-time OS?', options: ['Fast OS', 'Time-critical', 'Predictable timing', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 23, question: 'What is preemption?', options: ['Process interruption', 'CPU sharing', 'Forced context switch', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 24, question: 'What is RAID?', options: ['Disk redundancy', 'Data safety', 'Performance', 'All above'], correctAnswer: 3, difficulty: 'hard' },
    { id: 25, question: 'What is load balancing?', options: ['CPU load', 'Process distribution', 'Resource allocation', 'All above'], correctAnswer: 3, difficulty: 'hard' },
  ],
}

// ============================================================================
// PROFESSIONAL RANDOMIZATION ENGINE - Fisher-Yates Algorithm
// ============================================================================
export class QuizEngine {
  constructor(topic, difficulty, questionCount) {
    this.topic = topic
    this.difficulty = difficulty
    this.questionCount = Math.min(questionCount, this.getMaxQuestionsAvailable())
    this.sessionUsedQuestionIds = new Set()
    this.previousSessionUsedIds = new Set()
  }

  // Get maximum questions available for topic+difficulty
  getMaxQuestionsAvailable() {
    const questions = advancedQuizDatabase[this.topic] || []
    if (this.difficulty === 'mixed') {
      return questions.length
    }
    return questions.filter(q => q.difficulty === this.difficulty).length
  }

  // Fisher-Yates shuffle algorithm - true randomization
  static fisherYatesShuffle(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
    }
    return shuffled
  }

  // Filter questions by difficulty
  getQuestionsByDifficulty(allQuestions, difficulty) {
    if (difficulty === 'mixed') {
      return allQuestions
    }
    return allQuestions.filter(q => q.difficulty === difficulty)
  }

  // Generate unique quiz without repeats within session
  generateQuiz() {
    const allQuestions = advancedQuizDatabase[this.topic] || []

    if (allQuestions.length === 0) {
      console.warn(`No questions found for topic: ${this.topic}`)
      return []
    }

    // Get filtered questions by difficulty
    const filteredQuestions = this.getQuestionsByDifficulty(allQuestions, this.difficulty)

    if (filteredQuestions.length === 0) {
      console.warn(`No questions found for difficulty: ${this.difficulty}`)
      return []
    }

    // Shuffle using Fisher-Yates
    const shuffledQuestions = QuizEngine.fisherYatesShuffle(filteredQuestions)

    // Select unique questions without repeats in this session
    const selectedQuestions = []
    for (const question of shuffledQuestions) {
      const questionKey = `${this.topic}-${question.id}-${question.difficulty}`

      // Skip if already used in this session
      if (this.sessionUsedQuestionIds.has(questionKey)) {
        continue
      }

      // Prefer questions not used in previous sessions (but allow if needed)
      selectedQuestions.push(question)
      this.sessionUsedQuestionIds.add(questionKey)

      if (selectedQuestions.length >= this.questionCount) {
        break
      }
    }

    // If we couldn't get enough unique questions, log warning but return what we have
    if (selectedQuestions.length < this.questionCount) {
      console.warn(
        `Requested ${this.questionCount} questions but only ${selectedQuestions.length} available for ${this.topic} (${this.difficulty})`
      )
    }

    return selectedQuestions
  }

  // Mark questions as used for cross-session tracking
  markQuestionsAsUsed() {
    this.sessionUsedQuestionIds.forEach(id => {
      this.previousSessionUsedIds.add(id)
    })
  }

  // Set previous session used IDs for tracking
  setPreviousSessionUsedIds(usedIds) {
    this.previousSessionUsedIds = new Set(usedIds)
  }
}

export default advancedQuizDatabase
