
import { v4 as uuidv4 } from 'uuid';
import { SessionsClient } from '@google-cloud/dialogflow';


const predefinedReplies = {
    'help': 'How can I assist you? You can ask about quitting tips, our products, success stories, or general queries!',
    'products': 'We offer a variety of smoking cessation aids. Type "list products" to see what we have in stock.',
    'list products': 'Here are some of our products: Product 7, Product 22, Product 20... Type "product <number>" for more details.',
    'product 7': 'Product 7 - Manufacturer C (Type X), Price: $500.00, Quantity in Stock: 60',
    'quitting tips': 'Quitting smoking is a journey. We recommend starting with understanding your habit, preparing to quit, and considering nicotine replacement therapies.',
    'success stories': 'Many users have successfully quit smoking with our help. Type "view success stories" to read their stories.',
    'view success stories': 'User job: "I quit smoking yesterday". User sabu: "I quit smoking."',
    'shipping': 'Shipping takes 3-5 business days.',
    'return policy': 'You can return products within 30 days for a full refund.',
    'payment methods': 'We accept Visa, MasterCard, and PayPal.',
    'cancel order': 'To cancel an order, please contact customer service at support@learn2quitpro.com.',
    'progress tracker': 'You can track your progress towards quitting smoking on our website.',
    'support groups': 'Join our online support groups to connect with others who are also quitting smoking.',
    'side effects': 'Common side effects when quitting smoking include irritability, cravings, and difficulty concentrating.',
    'nicotine replacement therapy': 'Consider using nicotine patches, gum, or lozenges to help manage cravings.',
    'alternative therapies': 'Some people find acupuncture, hypnotherapy, or mindfulness meditation helpful in quitting smoking.',
    'benefits of quitting': 'Quitting smoking improves your health, saves money, and reduces the risk of chronic diseases.',
    'set quit date': 'Choose a quit date and commit to it. This can help you mentally prepare for quitting.',
    'track savings': 'Use our savings calculator to see how much money you\'ve saved by quitting smoking.',
    'motivational quotes': 'Remember, every craving you resist brings you one step closer to being smoke-free.',
    'physical activity': 'Regular exercise can help reduce cravings and improve your mood during the quitting process.',
    'healthy snacks': 'Keep healthy snacks like fruits, nuts, and veggies on hand to curb cravings.',
    'deep breathing exercises': 'Practice deep breathing exercises to help manage stress and cravings.',
    'avoid triggers': 'Identify and avoid triggers that make you want to smoke, such as alcohol or stressful situations.',
    'reward yourself': 'Celebrate milestones in your quitting journey with non-smoking rewards like a movie night or a spa day.',
    'stay hydrated': 'Drink plenty of water to flush toxins from your body and reduce cravings.',
    'update contact information': 'Make sure your contact information is up-to-date so we can reach you regarding your orders.',
    'set reminders': 'Set reminders on your phone or calendar to stay on track with your quitting goals.',
    'seek support': 'Don\'t hesitate to reach out to friends, family, or a support group for encouragement and accountability.',
    'avoid smoking areas': 'Stay away from places where smoking is allowed to reduce temptation.',
    'read success stories': 'Reading success stories from others who have quit smoking can inspire and motivate you on your journey.',
    'practice self-care': 'Take care of yourself by getting enough sleep, eating well, and managing stress.',
    'explore hobbies': 'Find new hobbies or activities to keep your mind occupied and distract from cravings.',
    'update progress': 'Regularly update your progress on our website to stay motivated and accountable.',
    'download quit apps': 'Consider downloading quit smoking apps for additional support and tracking tools.',
    'set boundaries': 'Let friends and family know that you\'re quitting smoking and ask for their support in not offering you cigarettes.',
    'celebrate milestones': 'Celebrate each smoke-free milestone, whether it\'s one day, one week, or one month smoke-free.',
    'stay positive': 'Stay positive and believe in yourself. Quitting smoking is challenging, but you are capable of success.',
    'ask for help': 'If you\'re struggling, don\'t be afraid to ask for help from a healthcare professional or smoking cessation counselor.',
    'avoid substitutes': 'Avoid substituting cigarettes with other tobacco products or nicotine substitutes long-term.',
    'practice mindfulness': 'Practice mindfulness techniques to help you stay present and cope with cravings.',
    'visualize success': 'Visualize yourself as a non-smoker and focus on the benefits of quitting.',
    'find a quit buddy': 'Find a friend or family member who also wants to quit smoking and support each other through the process.',
    'stay committed': 'Stay committed to your decision to quit smoking, even if you experience setbacks along the way.',
    'be patient': 'Be patient with yourself and understand that quitting smoking is a process that takes time and effort.',
    'reward yourself': 'Reward yourself for reaching milestones in your quitting journey, whether it\'s a small treat or a bigger reward.',
    'stay connected': 'Stay connected with our community and share your experiences with others who are also quitting smoking.',
    'hi': 'Hello! How can I assist you today?',
    'hello': 'Hi there! What can I do for you?',
    'hey': 'Hey! How can I help you?',
    'how are you': "I'm just a bot, but I'm here to help you! How can I assist you today?",
    'what\'s up': 'Not much, just here to assist you. What can I do for you?',
    'good morning': 'Good morning! How can I assist you today?',
    'good afternoon': 'Good afternoon! What can I do for you?',
    'good evening': 'Good evening! How can I help you?',
    'nice to meet you': 'Nice to "meet" you too! How can I assist you today?',
    'thank you': "You're welcome! If you need further assistance, feel free to ask.",
    'thanks': 'No problem! If you have any other questions, feel free to ask.',
    'bye': 'Goodbye! Feel free to come back if you have more questions in the future.',
    'see you later': 'See you later! If you need assistance later on, don\'t hesitate to return.',
    'take care': 'You too! Stay safe and healthy.',
    'how can I quit smoking': 'Quitting smoking is a journey. We can help you with tips, products, and support. How can I assist you?',
    'do you have any advice for quitting': 'Certainly! Understanding your triggers, setting a quit date, and seeking support are key. How can I assist you further?',
    'can you tell me about your products': 'Of course! We offer a variety of smoking cessation aids. How can I assist you with product information?',
    'how does your product work': 'Our products are designed to help you quit smoking by providing nicotine replacement therapy and support. How can I assist you further?',
    'where are you located': 'We are an online platform, so you can access our services from anywhere. How can I assist you today?',
    'do you offer support groups': 'Yes, we have online support groups where you can connect with others who are quitting smoking. How can I assist you further?',
    'what are the benefits of quitting smoking': 'Quitting smoking improves your health, saves money, and reduces the risk of chronic diseases. How can I assist you further?',
    'can I return a product': 'Yes, you can return products within 30 days for a full refund. How can I assist you further?',
    'what are your payment methods': 'We accept Visa, MasterCard, and PayPal. How can I assist you further?',
    'can I cancel my order': 'Yes, you can cancel an order by contacting customer service at support@learn2quitpro.com. How can I assist you further?',
    'are there any shipping fees': 'Shipping is free for orders above $50. How can I assist you further?',
    'do you have any specials or discounts': 'Yes, we occasionally offer specials and discounts on our products. How can I assist you further?',
    'can I track my order': 'Yes, you can track your order on our website. How can I assist you further?',
    'how can I update my account information': 'You can update your account information in the settings section of our website. How can I assist you further?',
    'can I change my password': 'Yes, you can change your password in the settings section of our website. How can I assist you further?',
    'do you have a mobile app': 'Yes, we have a mobile app available for both iOS and Android devices. How can I assist you further?',
    'can I contact customer service': 'Yes, you can contact customer service at support@learn2quitpro.com. How can I assist you further?',
    'what are your business hours': 'Our customer service team is available from 9 am to 5 pm EST, Monday through Friday. How can I assist you further?',
    'how can I access my order history': 'You can access your order history in the account section of our website. How can I assist you further?',
    'do you offer international shipping': 'Yes, we offer international shipping. How can I assist you further?',
    'what should I do if I experience technical difficulties': 'Please contact our technical support team at support@learn2quitpro.com. How can I assist you further?',
    'how can I submit a testimonial': 'You can submit a testimonial through the testimonial submission form on our website. How can I assist you further?',
    'can I place an order over the phone': 'Yes, you can place an order over the phone by calling our customer service team at 1-800-QUIT-NOW. How can I assist you further?',
    'do you have any recommendations for coping with cravings': 'Engaging in physical activity, practicing deep breathing exercises, and distracting yourself with a hobby can help cope with cravings. How can I assist you further?',
    'what are some healthy alternatives to smoking': 'Healthy alternatives include chewing gum, snacking on fruits and vegetables, and practicing mindfulness techniques. How can I assist you further?',
    'how can I stay motivated during my quitting journey': 'Setting small, achievable goals, rewarding yourself for milestones, and seeking support from friends and family can help stay motivated. How can I assist you further?',
    'what can I do if I slip up and smoke again': 'It\'s okay to slip up. Recognize the trigger, learn from the experience, and recommit to your quit journey. How can I assist you further?',
    'can I receive notifications about quitting tips': 'Yes, you can sign up for our newsletter to receive notifications about quitting tips and updates. How can I assist you further?',
    'what are some common smoking triggers': 'Common triggers include stress, social situations, and certain activities or routines. How can I assist you further?',
    'how can I avoid gaining weight while quitting': 'Engaging in regular physical activity, eating a balanced diet, and practicing mindful eating can help avoid weight gain while quitting. How can I assist you further?',
    'what can I do to improve my lung health': 'Quitting smoking, avoiding exposure to secondhand smoke, and engaging in regular exercise can improve lung health. How can I assist you further?',
    'how can I support a loved one who is quitting smoking': 'Offering encouragement, being understanding of their challenges, and providing distractions or alternatives can support a loved one who is quitting smoking.'
  };
  

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const userMessage = req.body.message.toLowerCase(); 
  const reply = predefinedReplies[userMessage]; 

  if (reply) {
    
    res.status(200).json({ reply });
  } else {
 
    const sessionClient = new SessionsClient();
    const sessionId = uuidv4(); 
    const sessionPath = sessionClient.projectAgentSessionPath('solent-e-stores', sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.message,
          languageCode: 'en-US',
        },
      },
    };

    try {
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      res.status(200).json({ reply: result.fulfillmentText });
    } catch (error) {
      console.error('Dialogflow API error:', error);
      res.status(500).json({ error: 'Error connecting to Dialogflow' });
    }
  }
}
