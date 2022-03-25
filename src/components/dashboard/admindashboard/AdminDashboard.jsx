import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as api from '../../../api/apiCalls'
import uploadicon from "../../../img/icon-upload.png"
import "./admindashboard.css"

export default function AdminDashboard() {
	// METHOD 1
	const [uploadedFile, setUploadedFile] = useState(null)
	const [filename, setFilename] = useState(null)
	const [message, setMessage] = useState(null)
	const navigate = useNavigate()
	
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

	const handleLogut = (e) => {
		e.preventDefault();

		localStorage.removeItem('token')
		localStorage.removeItem('role')
		navigate('/')
	}

    return <div>
		<div className="header">
			<span>Admin Dashboard</span>
			<span className="grow"></span>
			<div className="linkbar">
				<div className="link-box" onClick={() => navigate('/dashboard/list')}>
					<span>List</span>
				</div>
				<div className="link-box" onClick={handleLogut}>
					<span>Log Out</span>
				</div>
			</div>
		</div>

		<section className="fileupload-container">
			<div className="fileupload-section">
					<div className="custom-center">
						<span className="file-title">Upload Valid JSON File</span>
					</div>
					<label htmlFor="jsonfile" className="custom-center">
						<img className="fileupload" src={uploadicon} alt="Upload"/>
						<input type="file" id="jsonfile" name="jsonfile" accept=".json" onChange={handleFileUpload} /> 
					</label>
					{ 
						filename 
						&& 
						<span className="custom-center-file">
							<span className="selected-file">Selected File:</span> 
							<span className="selected-file">{filename}</span> 
						</span>
					}
					<button className="submit-btn" onClick={handleSubmit}>Submit</button>
					<div>
						{message && <span>{message}</span>}
					</div>
			</div>


		</section>
	</div>;
}
