import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
//import HomepageFeatures from '@site/src/components/HomepageFeatures';
import NewMods from "@site/src/components/NewMods/NewMods";
import styles from './index.module.css';
import Translate from '@docusaurus/Translate'

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (<header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
            <h1 className="hero__title">
                <Translate>欢迎</Translate>
            </h1>
            <text style={{
                "font-size": "1.5rem"
            }}>
                <br/>
                <Translate>在上方导航栏选择想要查看的项目。</Translate>
            </text>
        </div>
    </header>);
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (<Layout
        title={`HoloJaneway`}
        description="Description will go into a meta tag in <head />"
    >
        <HomepageHeader/>
        <main>
            <div className={styles.uss_shenzhou_info}>
                <img
                    src={require("@site/static/img/head.png").default}
                    alt="USS_Shenzhou head"
                />
                <text className={styles.text}>
                    <Translate>你好！我是</Translate><strong>USS_Shenzhou</strong><Translate>，你也可以叫我神舟。</Translate>
                    <br/><Translate>我主要使用Forge/NeoForge为Minecraft Java Edition编写模组。</Translate>
                    <br/><Translate>你可以在页面底端找到我的其他赛博刷新点。</Translate>
                </text>
            </div>
            <NewMods></NewMods>
        </main>
    </Layout>);
}
