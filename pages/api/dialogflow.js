import { SessionsClient } from '@google-cloud/dialogflow';

const dialogflowConfig = {
  projectId: 'solent-e-stores', 
  privateKey: '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC331K4RrK/M6T/jxexCeE9f5hs/ndNzAtZPfQeFenngZIMZxdlpYrElXuOZUg+NKuuOEHxKjhC8kPf1ebzktQM3MENu16u2VHTI89MyMwVueAQ0gJi5ceVRgGuNkBjNo2g7JRg6KEEnrUbvSxiQPYICEcGGZrw+9NzCBmDI4jG1pHhnzCHIge8JyY92WlmHFYkVawsPlLIPHvR4CrX5LzQtvYJAYoSl3PXYEjQsIzYX6kiseAUEpLLAUkVhI2jPxdhpe9Yzy1ReXW5z1EAWp9Qftyvlp1JunR6H2Es0wZgV0dqBl8Y+dH59eSG1vydXlHS6Y/rGbacaUff1r5vBDXZAgMBAAECggEAEy2IT68UCqxEy+DtXCpHI2ZxDAE4iVU8Y8j58r9fX6WciY2hG5l6EUn0EqSOtepBc9DrU8+PAbCKEskZJxOL6XGG8zs1Q3BoP+juwLf6zVNPQwHcfNsxh2i/WR/QdGimuf+i9D6fOL+i7Ss8e10CLFFMsx6tke/6HHfeTVbB99cRHuCee2MpISmPjvkKose++Sbc3L8DQsVJc0E1eERfZWQLTraJj8Rm0remIuHZ3/vMCJ8O8k9cf5mZn5V5KWsY1ycj3dTxFSkgRQTFwm9A02kXza5yYgjAN6Zv7u/rB7izYcs5+lTN/6B8jj2Rx9S5MxxQNzBEIYUSmhc3dq3aNwKBgQDjHVzpRUKQbfLrPRaa+EyOPQrekZ9GJg+mCqYEAukrQNIXvFJvuolHO+C34R56NvTIMI+qZT1y+MHftdtIIEXU9HGjskeWQnx50Y54Z9qpfSpdZcFIZqwKlBcNvSYqnOSKYAwS4ZMyocZdBnzIdFSBwb5y0EEKWohiID5TDE83xwKBgQDPQgfqVv2AZOR85c+SwbBUsAnhX9O5hJYtkCYRupqegq0FS7KE+c9YjWYaxmltoBATqITpIw1FdiaSqDhO+OFReQVeNXOwEoUCt87jrHE7Z4KXkMHV7UtWgJujb/r7zEv9rjem4mmpkkE8rvTD9Y+gP2bfxySTP2r1P0sPsHtlXwKBgHkadSqmFeJx3nB1eJJWCGxoPF2GBQogzYNadj/5VWANBnpFnyeYrg7f7OngDqJYn5oH2vOfXG7sGmUx0aXaH6J4XghNzkJfXYSPq4qkxkJOTcLTuYbjyKUzZj+bNrjOREdNA+MliZocDWwZQ3yYG1+9cdJDHgtpTwQT8WfTToKNAoGASHiKVAK++ZpN2u5wupxHkBVOHyRm4EPgT2ZMKX7aefqvjV5+uciwHAK1ZT9jthV2Camvb+X1yggaTMXNiq+z+c0bd2mxXivbnquvCCVQIrl7DIxteuRSp5io02lglZNGLxowE4av879UWGfE5pCC/EGvMyhrPaG7QK41DPNk8nkCgYBmeVHHHQROvsGvnppGbgoeHbWnaHqxyHhtkAx4Uuc+drcqlJq7JqAf5AvsP5SObcKGv8LbIMhD0qE1K/24i+GittEh8FPNVqIYjAlPv96WHtIXNOUzkaH5ubaKs0lALu9xB0JYP9+kbTIsesDbc58qPZ1woEV9DAZJFHLZuwcFjLA==-----END PRIVATE KEY-----',
  clientEmail: 'quitsmoking@solent-e-stores.iam.gserviceaccount.com',
};



const sessionClient = new SessionsClient({
  projectId: dialogflowConfig.projectId,
  credentials: {
    private_key: dialogflowConfig.privateKey,
    client_email: dialogflowConfig.clientEmail,
  },
});


const sessionId = uuidv4();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const sessionPath = sessionClient.sessionPath(dialogflowConfig.projectId, sessionId);
  
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.message,
        languageCode: 'en-US',
      },
    },
  };

  console.log('Sending request to Dialogflow:', request);

  try {
    const responses = await sessionClient.detectIntent(request);
    
    console.log('Received response from Dialogflow:', JSON.stringify(responses, null, 2));

    const result = responses[0].queryResult;
    
    res.status(200).json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error('Error connecting to Dialogflow:', error);
    res.status(500).json({ error: 'Error connecting to Dialogflow' });
  }
}