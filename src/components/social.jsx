import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

const Social = () => {
  return (
    <div className="faded-text pt-2">
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a
          href="https://linkedin.com/in/rudra-vashishtha-7622a3217/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://instagram.com/rudra-vashishtha/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="mailto:rudra.vashishtha.works@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <FaEnvelope size={20} />
        </a>
      </div>
    </div>
  );
};

export default Social;
