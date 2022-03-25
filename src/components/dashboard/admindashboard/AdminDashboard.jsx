import React, { useState } from "react";
import * as api from '../../../api/apiCalls'

export default function AdminDashboard() {
	// METHOD 1
	const [uploadedFile, setUploadedFile] = useState(null)
	const [filename, setFilename] = useState(null)
	const [message, setMessage] = useState(null)
	
	const handleFileUpload = (e) => {
		e.preventDefault()

		setUploadedFile(e.target.files[0]);
		setFilename(e.target.files[0].name)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formdata = new FormData();
		formdata.append('myFileName', filename);
		formdata.append('jsonfile', uploadedFile);

		try {
			const res = await api.JSONfileUpload(formdata)
			setMessage(res.data.message)
		} catch (error) {
			console.log(error.message);
		}
	}

	// METHOD 2
	// Parse & Save

	// const [filename, setFilename] = useState(null)
	// const [selectedFile, setSelectedFile] = useState(null)

	// const handleFileUpload = (e) => {
	// 	setFilename(e.target.files[0].name)
		
	// 	console.log('file', e.target.files[0]);

	// 	const fileReader = new FileReader();
		
	// 	fileReader.readAsText(e.target.files[0], "UTF-8")

	// 	fileReader.onload = (e) => {
	// 		// console.log(JSON.parse(e.target.result));
	// 		setSelectedFile(JSON.parse(e.target.result));
	// 	}
	// }

	// const handleSubmit = async () => {
	// 	console.log('data', data);
	// 	const data = {
	// 		filename: filename,
	// 		content: selectedFile
	// 	}
	// 	await api.uploadFile(data)
	// 	console.log('data', data);
	// }

    return <div>
		<div>
			<span>AdminDashboard</span>
		</div>

		<div>
			<input type="file" id="file" name="jsonfile" accept=".json" onChange={handleFileUpload} /> 
		</div>

		<div>
			<button onClick={handleSubmit}>Submit</button>
		</div>

		<div>
			{message && <span>{message}</span>}
		</div>
	</div>;
}
