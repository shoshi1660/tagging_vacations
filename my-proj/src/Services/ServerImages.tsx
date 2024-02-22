import { Component } from "react";
import "./ServerImages.css";

class ServerImages extends Component {

    public render(): JSX.Element {
        return (
            <div className="ServerImages">
				<img src="http://localhost:4000/images/grass.jpg"></img>
            </div>
        );
    }
}

export default ServerImages;
