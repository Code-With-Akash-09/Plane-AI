const { InferenceClient } = require("@huggingface/inference");

const huggingFaceAPI = new InferenceClient(process.env.HF_TOKEN);

export default huggingFaceAPI