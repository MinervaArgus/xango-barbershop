import React from "react";

function AboutUs() {
    return (
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2857.4690569283784!2d-3.0332846153667874!3d43.32717383797694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e599d938e5817%3A0xf0f4650ff911055e!2sC.%20Jenaro%20Ora%C3%A1%20Kalea%2C%2028%2C%2048980%20Santurce%2C%20Vizcaya%2C%20Spain!5e0!3m2!1sen!2sus!4v1665865017520!5m2!1sen!2sus"
                style={{ border: "0", width: "100vw", height: "92vh" }}
                allowFullScreen=""
                loading="lazy"
                title="Xango Location"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div >
    )
}

export default AboutUs;