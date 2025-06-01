import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate'

const CFMod = ({modUrl, buttons}) => {
    const [modData, setModData] = useState(null);

    useEffect(() => {
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

const mrApiUrl = 'https://api.modrinth.com/v2/';
const baseMrUrl = 'https://modrinth.com/mod/';
const MRMod = ({slug, buttons}) => {
    const [modData, setModData] = useState(null);
    const [verData, setVerData] = useState(null);

    useEffect(() => {
        fetch(mrApiUrl + 'project/' + slug)
            .then((response) => response.json())
            .then((data) => setModData(data))
            .catch((error) => console.error(error));
    }, [slug]);

    useEffect(() => {
        if (!modData || !modData.versions || modData.versions.length === 0) {
            return;
        }
        fetch(mrApiUrl + 'version/' + modData.versions[0])
            .then((res) => res.json())
            .then((data) => setVerData(data))
            .catch((err) => console.error(err));
    }, [modData?.versions?.[0]]);

    const latest = 'Latest: ';

    return (
        <div className={styles.modContainer}>
            {modData && (
                <>
                    <img
                        src={modData.icon_url}
                        alt={modData.title}
                        className={styles.thumbnail}
                    />
                    <div className={styles.modInfo}>
                        <h2 className={styles.title}>
                            <a href={baseMrUrl + slug} target="_blank" rel="noopener noreferrer">
                                {modData.title}
                            </a>
                        </h2>
                        <p className={styles.summary}>{modData.description}</p>
                        <p className={styles.latestVersion}>
                            {latest}
                            {verData?.files?.[0] && (
                                <a
                                    href={verData.files[0].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {verData.files[0].filename}
                                </a>
                            )}
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

const WorkingMod = ({img, title, description, buttons}) => {
    return (
        <div className={styles.modContainer}>
            {(
                <>
                    <img
                        src={require(`@site/static/img/${img}`).default}
                        alt={title + ' Image'}
                        className={styles.thumbnail}
                    />
                    <div className={styles.modInfo}>
                        <h2 className={styles.title}>
                            {title}
                        </h2>
                        <p className={styles.summary}>
                            {description}
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

const BiliMod = ({img, title, videoUrl}) => {
    return (
        <div className={styles.biliMod}>
            {(
                <>
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className={styles.biliThumbnail}>
                        <img
                            src={require(`@site/static/img/${img}`).default}
                            alt={title + ' Image'}
                            className={styles.biliThumbnail}
                        />
                    </a>
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                        <div className={styles.modInfo}>
                            <h2 className={styles.title}>
                                {title}
                            </h2>
                        </div>
                    </a>
                </>
            )}
        </div>
    );
};

const ModList: React.FC = () => {
    const cfApiUrl = 'https://api.cfwidget.com/minecraft/mc-mods/';
    const baseCfUrl = 'https://www.curseforge.com/minecraft/mc-mods/';

    const mp = 'mad-particle';
    const t88 = 't88';
    const brighter = 'brighter-block-light';
    const r6 = 'rainbow6';
    const extinguish = 'extinguish-by-uss_shenzhou';
    const hotbar = '983846';
    const anomalysDelight = 'anomalys-delight';
    const section31 = 'section-31';

    return (
        <section className={styles.container}>
            <h1><Translate>我的模组</Translate></h1>
            <h2 className={styles.h2Margin}><Translate>更新中</Translate></h2>

            <CFMod modUrl={cfApiUrl + mp} buttons={[
                {text: 'Demo Video', url: 'https://www.bilibili.com/video/BV1Ao4y1t7XC/'},
                {text: 'CurseForge', url: baseCfUrl + mp + '/files'},
                {text: 'Modrinth', url: 'https://modrinth.com/mod/mad-particle'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/7482.html'},
            ]}/>
            <CFMod modUrl={cfApiUrl + t88} buttons={[
                {text: 'CurseForge', url: baseCfUrl + t88 + '/files'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/7410.html'},
            ]}/>
            <CFMod modUrl={cfApiUrl + hotbar} buttons={[
                {text: 'Demo Video', url: 'https://www.bilibili.com/video/BV1DCx4eUEQR/'},
                {text: 'CurseForge', url: baseCfUrl + hotbar + '/files'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/14032.html'},
            ]}/>
            <MRMod slug={anomalysDelight} buttons={[
                {text: 'Demo Video', url: 'https://www.bilibili.com/video/BV1iJrkYsEb1/'},
                {text: 'Modrinth', url: 'https://modrinth.com/mod/anomalys-delight'},
            ]}/>
            <CFMod modUrl={cfApiUrl + section31} buttons={[
                {text: 'Demo Video', url: 'https://www.bilibili.com/video/BV1tt9UY4E8x/'},
                {text: 'CurseForge', url: baseCfUrl + section31 + '/files'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/18765.html'},
            ]}/>
            <WorkingMod img={"up.png"}
                        title={'Guide Me To'}
                        description={'Flexible signs designed for an online conventions.'}
                        buttons={[]}
            />

            <h2 className={styles.h2Margin}><Translate>制作中/计划中</Translate></h2>

            <CFMod modUrl={cfApiUrl + r6} buttons={[
                //{text: 'All downloads', url: baseCFUrl + r6 + '/files'},
                //{text: 'MCMod', url: 'https://www.mcmod.cn/class/4799.html'},
            ]}/>
            <h2 className={styles.h2Margin}><Translate>停止更新</Translate></h2>
            <CFMod modUrl={cfApiUrl + brighter} buttons={[
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV17Q4y1e7Ri'},
                {text: 'CurseForge', url: baseCfUrl + brighter + '/files'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/5215.html'},
            ]}/>
            <CFMod modUrl={cfApiUrl + extinguish} buttons={[
                {text: 'All downloads', url: baseCfUrl + extinguish + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV1aG411H7kQ'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/6752.html'},
            ]}/>

            <h2 className={styles.h2Margin}><Translate>非发布</Translate></h2>

            <div className={styles.biliModAllContainer}>
                <BiliMod img={'kamu1.jpg'}
                         title={'怪物末日'}
                         videoUrl={'https://www.bilibili.com/video/BV16M411R7n3/'}
                />
                <BiliMod img={'kamu2.jpg'}
                         title={'经验球生存'}
                         videoUrl={'https://www.bilibili.com/video/BV1Jm411D7WQ/'}
                />
                <BiliMod img={'kamu3.jpg'}
                         title={'村民生存'}
                         videoUrl={'https://www.bilibili.com/video/BV1Jm411D7WQ/'}
                />
            </div>
        </section>
    );
};

export default ModList;
