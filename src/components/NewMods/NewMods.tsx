import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const Mod = ({modUrl, buttons}) => {
    const [modData, setModData] = useState(null);

    useEffect(() => {
        // 使用 fetch 或其他方法获取数据
        fetch(modUrl)
            .then((response) => response.json())
            .then((data) => setModData(data))
            .catch((error) => console.error(error));
    }, [modUrl]);

    const latest = 'Latest: ';

    return (
        <div className={styles.modContainer}>
            {modData && (
                <>
                    <img
                        src={modData.thumbnail}
                        alt={modData.title}
                        className={styles.thumbnail}
                    />
                    <div className={styles.modInfo}>
                        <h2 className={styles.title}>
                            <a href={modData.urls.curseforge} target="_blank" rel="noopener noreferrer">
                                {modData.title}
                            </a>
                        </h2>
                        <p className={styles.summary}>{modData.summary}</p>
                        <p className={styles.latestVersion}>
                            {latest}
                            <a
                                href={modData.download.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {modData.download.display}
                            </a>
                        </p>
                        <div className={styles.buttonContainer}>
                            {buttons.map((button, index) => (
                                <a
                                    key={index}
                                    href={button.url}
                                    className={styles.button}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {button.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const NewMods: React.FC = () => {
    const baseAPIUrl = 'https://api.cfwidget.com/minecraft/mc-mods/';
    const baseCFUrl = 'https://www.curseforge.com/minecraft/mc-mods/';

    const mp = 'mad-particle';
    const t88 = 't88';
    const brighter = 'brighter-block-light';
    const r6 = 'rainbow6';
    const extinguish = 'extinguish-by-uss_shenzhou';

    return (
        <section className={styles.container}>
            <h1>我的模组</h1>
            <h2>更新中</h2>
            <Mod modUrl={baseAPIUrl + mp} buttons={[
                {text: 'All downloads', url: baseCFUrl + mp + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV1Ao4y1t7XC'},
                {text: 'Modrinth', url: 'https://modrinth.com/mod/mad-particle'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/7482.html'},
            ]}/>
            <Mod modUrl={baseAPIUrl + t88} buttons={[
                {text: 'All downloads', url: baseCFUrl + t88 + '/files'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/7410.html'},
            ]}/>
            <Mod modUrl={baseAPIUrl + brighter} buttons={[
                {text: 'All downloads', url: baseCFUrl + brighter + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV17Q4y1e7Ri'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/5215.html'},
            ]}/>
            <h2>制作中</h2>
            <Mod modUrl={baseAPIUrl + r6} buttons={[
                //{text: 'All downloads', url: baseCFUrl + r6 + '/files'},
                //{text: 'MCMod', url: 'https://www.mcmod.cn/class/4799.html'},
            ]}/>
            <h2>停止更新</h2>
            <Mod modUrl={baseAPIUrl + extinguish} buttons={[
                {text: 'All downloads', url: baseCFUrl + extinguish + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV1aG411H7kQ'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/6752.html'},
            ]}/>
        </section>
    );
};

export default NewMods;
