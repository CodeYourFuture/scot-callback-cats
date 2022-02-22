import { useState, useEffect } from "react";
import "../pages/Messages.css";


function Messages () {

    const [messageData, setMessageData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/messages")
            .then((response) => {
                if (!response.ok) {
                    throw Error(
                        "There was an error getting the data"
                    );
                }
                return response.json();
            })
            .then((data) => {
                setMessageData(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
        <h1 className="py-3">Messages</h1>
        <div className="table-responsive">
			<table className="table align-middle table-hover border">
				<caption className="visually-hidden">Messages table</caption>
				<thead className="table-secondary">
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Message</th>
						<th scope="col">Sent on</th>
						<th scope="col">URL</th>
                    </tr>
				</thead>
				<tbody>
					{messageData.map((message)=> {
                        return (
                            <tr key={message.url}>
                                <td className="fw-bold">{message.name}</td>
                                <td className="fw-light">{message.message}</td>
                                <td>{new Date(message.time_sent).toLocaleDateString()}</td>
                                <td><a href={message.url} className="link-secondary link-on-hover">{message.url}</a></td>
                            </tr>
                            );
                        })
                    }
                </tbody>
			</table>
		</div>
        </>
    );
}





export default Messages;
