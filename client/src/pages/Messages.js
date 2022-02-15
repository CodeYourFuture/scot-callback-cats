import { useState, useEffect } from "react";


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
        <h3 className="py-3">Messages</h3>
        <div className="table-responsive">
			<table className="table align-middle table-hover table-striped styled-table border text-nowrap">
				<caption className="visually-hidden">Messages table</caption>
				<thead className="table-dark">
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
                                <td>{message.name}</td>
                                <td>{message.message}</td>
                                <td>{new Date(message.time_sent).toLocaleDateString()}</td>
                                <td><a href={message.url} className="link-primary">View {message.name}&#39;s booking</a></td>
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
