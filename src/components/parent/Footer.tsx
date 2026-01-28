import AboutUs from "../children/footer/AboutUs";
import Copyright from "../children/footer/Copyright";

export default function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center flex-col text-sm text-black/60">
        <AboutUs />
        <Copyright />
      </div>
    </footer>
  );
}
