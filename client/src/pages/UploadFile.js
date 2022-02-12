import CSVReader from "react-csv-reader";

const convertHeader = (header) => {
	const conversionObject = {
		"Submitted On": "dateAdded",
		"How many bikes are you requesting": "bikesNeeded",
		Name: "name",
		"Country of Origin": "countryOfOrigin",
		Language: "languageSpoken",
		"Do you speak English": "englishSpeaker",
		"how well do you speak English": "englishSkillLevel",
		"How long have you been in Scotland for": "timeInScotland",
		Status: "residencyStatus",
		"Phone number": "phoneNumber",
	};

	const convertedHeaders = header.map((e) => {
		return conversionObject[e];
	});

	return convertedHeaders;
};

const UploadFile = () => {
	const selectFile = (data) => {
		const header = data.splice(0, 1)[0];
		const convertedHeaders = convertHeader(header);

		const clients = data
		.filter((data)=> data.length>1)
		.map((item) => {
			const client = {};
			item.forEach((field, index) => {
				const propertyName = convertedHeaders[index];
				client[propertyName] = field;
			});
			return client;
		});

		fetch("/api/clients", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(clients),
		}).then(() => {
			location.reload();
		});
	};

	return (
		<CSVReader
			cssClass="mt-3 me-1 d-inline-block"
			cssInputClass="visually-hidden"
			cssLabelClass="btn btn-primary"
			label="Select CSV to import"
			onFileLoaded={selectFile}
		/>
	);
};

export default UploadFile;
