import { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const handleChangeImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const worker = createWorker();

  const convertImageToText = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    console.log(data);
  };

  useEffect(() => {
    convertImageToText;
  }, [selectedImage]);
  return (
    <>
      <div className="heading">
        <h1>Image To Text</h1>
        <p>Translate words into image</p>
      </div>

      <div className="App">
        <div className="input-wrapper">
          <label htmlFor="upload">Upload Image</label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </div>

        <div className="result">
          {selectedImage && (
            <div className="box-image">
              <img
                src={URL.createObjectURL(selectedImage)}
                width="300px"
                alt="thumbmnail"
              />
            </div>
          )}

          {textResult && (
            <div className="box-result">
              <p>{textResult}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
