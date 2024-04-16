import Image from "next/image";
import styles from './avatar.module.css'

interface AvatarProps {
    name: string;
    imageSrc: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageSrc }) => {
    return (
        <ul className={styles.avatar}>
            <li><Image src={imageSrc} width={32} height={32} alt={`Image do(a) ${name}`}/></li>
            <li>@{name}</li>
        </ul>
    );
}

export default Avatar;
