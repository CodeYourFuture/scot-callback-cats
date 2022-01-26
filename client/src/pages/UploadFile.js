

import CSVReader from "react-csv-reader";
const UploadFile = () =>  {

const handleupload = (data, fileInfo, originalFile) =>{
	 const response =  fetch("/api/upload", {
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
			<div className="container">
				<div className="row">
					<div className="col align-self-center">
						<div className="input-group">
							<CSVReader onFileLoaded={handleupload} accept=".csv" />

							<button
								className="btn btn-outline-secondary"
								type="button"
								id="inputGroupFileAddon04"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default UploadFile;
