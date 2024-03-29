const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' :  size === 'medium' ? '512x512' : '1024x1024';
 try {
    const response = await openai.createImage({
        prompt,
        n: 1,
        size: imageSize
    });

    const imageUrl = response.data.data[0].url

       res.status(200).json({
        success: true,
        data: imageUrl,
    });
 } catch (error) {
    if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }

       res.status(400).json({
        success: false,
        error: 'Image can not be generated',
    });
 }
};

const createCompletion = async (req, res) => {
   try {
      const completeion = await openai.createChatCompletion({
         model: "text-davinci-003",
         prompt: "Hello world",
      });

      console.log(completeion.data.choices[0].text);
   } catch (error) {
       if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
   }
}

module.exports = { generateImage, createCompletion };