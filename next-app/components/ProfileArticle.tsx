'use client';

import { AnimatedHeading } from '@/components/AnimatedHeading';
import { useTranslation } from '@/components/LocaleProvider';
import { profileName } from '@/data/profile';
import Image from 'next/image';

/**
 * プロフィールを表示する記事セクション。
 * @returns プロフィールの記事要素。
 */
export const ProfileArticle = () => {
    const { t } = useTranslation();

    return (
        <article className="article article--profile" id="profile">
            <AnimatedHeading className="heading js_move-heading is-animated-top" level={1}>
                {t('navigation.プロフィール')}
            </AnimatedHeading>
            <div className="wrapper">
                <section className="section section--profile-name">
                    <h2 className="heading--profile-name">hiratsuka-r</h2>
                    <div className="profile-name is-animated-fluffy">
                        <div className="profile-name__heading">
                            {profileName.map((character, index) => (
                                <span key={`${character}-${index}`}>{character}</span>
                            ))}
                        </div>
                        <Image className="profile-name__image" src="/portfolio/img/22903625.jpg" alt="" width={280} height={280} />
                    </div>
                    <div className="profile-name__content">
                        {t<string[]>('profile.自己紹介').map((paragraph) => (
                            <p className="u-mb" key={paragraph} style={{ whiteSpace: 'pre-line' }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>
            </div>
        </article>
    );
};
