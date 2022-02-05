import icon from "./icon.svg";
import "./UploadFile.css";
import CSVReader from "react-csv-reader";
import { useState } from "react";

const UploadFile = () => {
	const [file, setfile] = useState(null);

	const convertHeader = (header) => {

		const conversionObject = {
			"Submitted On": "date_added",
			"How many bikes are you requesting": "bikes",
			Name: "name",
			"Country of Origin": "country_of_origin",
			Language: "language_spoken",
			"Do you speak English": "english_speaker",
			"how well do you speak English": "english_skill_level",
			"How long have you been in Scotland for": "time_in_scotland",
			Status: "residency_status ",
		};

		let convertedHeader = header.map((e) => {
			return conversionObject[e];

		});
		console.log(convertedHeader);
		return convertedHeader;
	};
	const selectFile = (data, fileInfo, originalFile) => {
		const header = data.splice(0, 1)[0];
		let convertedHeader = convertHeader(header);
let convertdata =  data.map((item) => {
		// item -> ["22/01/2022", 4, "Ahmed Jalal" ...]
		let newObject = {};
		item.forEach((field, index) => {
			let propertyName = convertedHeader[index];
			newObject[propertyName] = field; // newObject["date_added"] = "22/01/2022" , and so on...
		});
		return newObject;
 });

		setfile(convertdata);
		console.log(convertdata);
	};
	const handleupload = () => {
		const response = fetch("/api/upload", {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(file),
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
							<CSVReader onFileLoaded={selectFile} accept=".csv" />
							<button
								type="button"
								className="btn btn-secondary  "
								onClick={handleupload}
							>
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
