const express = require('express');
const router = express.Router();

// Simple chatbot responses
const responses = {
    'investment': 'Based on your profile, I recommend a diversified portfolio with 60% stocks and 40% bonds.',
    'savings': 'Try to save at least 20% of your monthly income for long-term financial goals.',
    'budget': 'Follow the 50/30/20 rule: 50% needs, 30% wants, and 20% savings.',
    'retirement': 'Start saving early for retirement. Consider maxing out your 401(k) contributions.',
    'debt': 'Prioritize paying off high-interest debt while maintaining emergency savings.',
    'default': 'I can help you with investment advice, savings tips, and budgeting strategies. What would you like to know?'
};

// Middleware to check if request has a token
const auth = require('../middleware/auth');

// Get chatbot response
router.post('/message', auth, (req, res) => {
    try {
        const { message } = req.body;
        const lowerMessage = message.toLowerCase();
        
        let response = responses.default;
        
        // Check for keywords in the message
        Object.keys(responses).forEach(key => {
            if (lowerMessage.includes(key)) {
                response = responses[key];
            }
        });
        
        res.json({ response });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;