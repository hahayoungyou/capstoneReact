import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">한성대학교 컴퓨터공학부 김예원,김한빛,조하영</span>

                </footer>
            </div>
        );
    }
}

export default FooterComponent;