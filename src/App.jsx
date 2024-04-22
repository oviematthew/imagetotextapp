import { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChangeImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const convertImageToText = async () => {
    const worker = await createWorker("eng");
    const returnValue = await worker.recognize(selectedImage);
    setTextResult(returnValue.data.text);
    await worker.terminate();
  };

  const copyText = () => {
    setShowAlert(true);
  };
  const resetValues = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (selectedImage) {
      convertImageToText();
    }
  }, [selectedImage]);
  return (
    <>
      <div className="heading">
        <h1>Image To Text Converter</h1>
        <p>Translate words in an image to text within seconds.</p>
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

        {showAlert && (
          <div className="alert">
            <Alert
              variant="primary"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Text copied to clipboard!
            </Alert>
          </div>
        )}

        <div className="result">
          {textResult && (
            <div className="box-result">
              <p>{textResult}</p>
              <CopyToClipboard text={textResult}>
                <Button variant="primary" onClick={copyText}>
                  Copy Text
                </Button>
              </CopyToClipboard>

              <Button variant="danger" onClick={resetValues}>
                Reset
              </Button>
            </div>
          )}

          {selectedImage && (
            <div className="box-image">
              <img
                src={URL.createObjectURL(selectedImage)}
                width="40%"
                alt="thumbmnail"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
