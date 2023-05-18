import css from "../Footer/footer.module.css";
import face from "../../pics/facebook.png";
import twitter from "../../pics/twitter.png";
import linked from "../../pics/linked.png";

const Footer = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.language}></div>
      <div className={css.nav}>
        <h2>Navigation</h2>
        <ul>
          <li>Home</li>
          <li>FAQ</li>
          <li>Investor Relatins</li>
          <li>Jobs</li>
          <li>About Us</li>
          <li>Help Center</li>
        </ul>
      </div>
      <div className={css.legal}>
        <h2>Legal</h2>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of service</li>
          <li>Cookie Preferences</li>
          <li>Corporate Information</li>
        </ul>
      </div>
      <div className={css.talk}>
        <h2>Talk To Us</h2>
        <ul>
          <li>support@ercom.com</li>
          <li>+66 2399 1145</li>
        </ul>
      </div>
      <div className={css.social}>
        <h2>Follow Us</h2>
        <div className={css.oneMoreFuckingDiv}>
          <div className={css.logo}>
            <img src={face} />
          </div>
          <div className={css.logo}>
            <img src={twitter} />
          </div>
          <div className={css.logo}>
            <img src={linked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
