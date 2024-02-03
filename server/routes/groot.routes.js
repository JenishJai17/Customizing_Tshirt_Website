import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const maxTokens = 50;

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router
  .route('/')
  .get((req, res) =>
    res.status(200).json({ message: 'Hello From Groot Routes' })
  );

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      maxTokens: maxTokens,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(response);

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error + 'Error');
    res.status(500).json({ message: error.message || 'Error has occurred' });
  }
});

export default router;
