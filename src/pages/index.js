import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
//import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">HoloJaneway</h1>
                <p className="hero__subtitle"><br/>在上方导航栏选择想要查看的项目。</p>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`HoloJaneway`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader/>
            <main>
                <div
                    className={styles.uss_shenzhou_info}
                >
                    <img
                        src={require("@site/static/img/head.png").default}
                        alt="USS_Shenzhou head"
                    />
                    <p className={styles.text}>
                        你好，我是<strong>USS_Shenzhou</strong>，也可以叫我神舟。
                        <br/>
                        我主要使用Forge/NeoForge为Minecraft Java Edition编写模组。
                        <br/>
                        你可以在页面底端找到我的其他赛博刷新点。
                    </p>
                </div>
            </main>
        </Layout>
    );
}
