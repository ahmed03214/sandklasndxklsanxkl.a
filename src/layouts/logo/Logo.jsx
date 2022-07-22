import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image
          className="ps-2"
          width={180}
          height={45}
          src="/logo2.webp"
          alt="logo"
        />
      </a>
    </Link>
  );
};

export default Logo;
