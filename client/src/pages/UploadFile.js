import icon from "./icon.svg";
import "./UploadFile.css";
import CSVReader from "react-csv-reader";
const UploadFile = () => {

	const handleupload = (data, fileInfo, originalFile) => {
		const response = fetch("/api/upload", {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(data),
		});
	};
	return (
		<form>
			<div>
				<h4>Upload Page</h4>
			</div>
			<div className="container p-5">
				<div className="row">
					<div className="col align-self-center">
						<div className="input-group">
							<CSVReader onFileLoaded={handleupload} accept=".csv" />
							<button type="button" className="btn btn-secondary  ">
								<img
									className="icon"
									data-qa="icon"
									src={icon}
									alt="upload icon"
								/>{" "}
								UploadFile
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default UploadFile;
