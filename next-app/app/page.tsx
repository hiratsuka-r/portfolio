import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { LanguageSwitcher, LocaleProvider } from '@/components/LocaleProvider';
import { ProfileApproach } from '@/components/ProfileApproach';
import { ProfileArticle } from '@/components/ProfileArticle';
import { ProfileCapabilities } from '@/components/ProfileCapabilities';
import { SkillsArticle } from '@/components/SkillsArticle';
import { TimelineArticle } from '@/components/TimelineArticle';
import { WorkArticle } from '@/components/WorkArticle';

const Home = () => {
    return (
        <LocaleProvider>
            <LanguageSwitcher />
            <main>
                <ProfileArticle />
                <ProfileApproach />
                <ProfileCapabilities />
                <WorkArticle />
                <SkillsArticle />
                <TimelineArticle />
                <BackToTop />
            </main>
            <Footer />
        </LocaleProvider>
    );
};

export default Home;
