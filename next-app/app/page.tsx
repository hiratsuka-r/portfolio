import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { ProfileApproach } from '@/components/ProfileApproach';
import { ProfileArticle } from '@/components/ProfileArticle';
import { ProfileCapabilities } from '@/components/ProfileCapabilities';
import { SkillsArticle } from '@/components/SkillsArticle';
import { TimelineArticle } from '@/components/TimelineArticle';
import { WorkArticle } from '@/components/WorkArticle';

export default function Home() {
    return (
        <>
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
        </>
    );
}
