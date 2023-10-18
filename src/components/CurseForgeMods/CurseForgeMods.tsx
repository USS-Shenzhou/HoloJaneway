import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";

const CFMod: React.FC<{ id: number }> = ({id}) => {
    // TODO: fix mobile styling
    return (
        <iframe
            src={`https://www.cfwidget.com/${id}`}
            width={"100%"}
            style={{border: "none"}}
            scrolling={"no"}
        />
    );
};

const CFMods: React.FC = () => {
    const [mods, setMods] = useState<number[]>([]);

    return (
        <section className={styles.container}>
            <h1>我的模组</h1>
            <h2>更新中</h2>
            <div className={styles.modWidgetContainer}>
                <CFMod id={666685}/>
                <CFMod id={663112}/>
                <CFMod id={552271}/>
            </div>
            <h2>制作中</h2>
            <div className={styles.modWidgetContainer}>
                <CFMod id={406413}/>
            </div>
            <h2>停更</h2>
            <div className={styles.modWidgetContainer}>
                <CFMod id={644015}/>
            </div>
        </section>
    );
};

export default CFMods;