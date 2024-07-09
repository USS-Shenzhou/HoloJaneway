import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate'

const CFMod = ({modUrl, buttons}) => {
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
    const baseAPIUrl = 'https://api.cfwidget.com/minecraft/mc-mods/';
    const baseCFUrl = 'https://www.curseforge.com/minecraft/mc-mods/';

    const mp = 'mad-particle';
    const t88 = 't88';
    const brighter = 'brighter-block-light';
    const r6 = 'rainbow6';
    const extinguish = 'extinguish-by-uss_shenzhou';
    const hotbar = '983846';

    return (
        <section className={styles.container}>
            <h1><Translate>我的模组</Translate></h1>
            <h2 className={styles.h2Margin}><Translate>更新中</Translate></h2>
            <CFMod modUrl={baseAPIUrl + mp} buttons={[
                {text: 'All downloads', url: baseCFUrl + mp + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV1Ao4y1t7XC'},
                {text: 'Modrinth', url: 'https://modrinth.com/mod/mad-particle'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/7482.html'},
            ]}/>
            <CFMod modUrl={baseAPIUrl + t88} buttons={[
                {text: 'All downloads', url: baseCFUrl + t88 + '/files'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/7410.html'},
            ]}/>
            <CFMod modUrl={baseAPIUrl + brighter} buttons={[
                {text: 'All downloads', url: baseCFUrl + brighter + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV17Q4y1e7Ri'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/5215.html'},
            ]}/>
            <CFMod modUrl={baseAPIUrl + hotbar} buttons={[
                       {text: 'All downloads', url: baseCFUrl + hotbar + '/files'},
                    {text: 'MCMod', url: 'https://www.mcmod.cn/class/14032.html'},
                    ]}/>
            <h2 className={styles.h2Margin}><Translate>制作中/计划中</Translate></h2>
            <CFMod modUrl={baseAPIUrl + r6} buttons={[
                //{text: 'All downloads', url: baseCFUrl + r6 + '/files'},
                //{text: 'MCMod', url: 'https://www.mcmod.cn/class/4799.html'},
            ]}/>
            <WorkingMod img={"up.png"}
                        title ={'Tell Me Where (tentative)'}
                        description={'Signage designed for an online conventions.'}
                        buttons={[]}
            />
            <WorkingMod img={"question.png"}
                        title ={'NIyma\' (tentative)'}
                        description={'NIyma\'is the Klingon word for "phantom" or "apparition" -- something that seems to appear, but isn\'t really there. Is it possible to create a 1000-player convention?'}
                        buttons={[]}
            />
            <WorkingMod img={"question.png"}
                        title ={'安布罗斯乐事'}
                        description={'安布罗斯餐厅Minecraft分店现在在数据层开张了！位于全维度销量最高的游戏之中，用各色菜肴填饱你的下层叙事角色！'}
                        buttons={[]}
            />
            <h2 className={styles.h2Margin}><Translate>停止更新</Translate></h2>
            <CFMod modUrl={baseAPIUrl + extinguish} buttons={[
                {text: 'All downloads', url: baseCFUrl + extinguish + '/files'},
                {text: 'Demo', url: 'https://www.bilibili.com/video/BV1aG411H7kQ'},
                {text: 'MCMod', url: 'https://www.mcmod.cn/class/6752.html'},
            ]}/>
            <h2 className={styles.h2Margin}><Translate>非发布</Translate></h2>
            <div className={styles.biliModAllContainer}>
                <BiliMod img ={'kamu1.jpg'}
                         title={'怪物末日'}
                         videoUrl ={'https://www.bilibili.com/video/BV16M411R7n3/'}
                />
                <BiliMod img ={'kamu2.jpg'}
                         title={'经验球生存'}
                        videoUrl ={'https://www.bilibili.com/video/BV1Jm411D7WQ/'}
                        />
                <BiliMod img ={'kamu3.jpg'}
                         title={'村民生存'}
                         videoUrl ={'https://www.bilibili.com/video/BV1Jm411D7WQ/'}
                />
            </div>
        </section>
    );
};

export default ModList;
