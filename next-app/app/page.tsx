import { BackToTop } from '../components/BackToTop';
import { Footer } from '../components/Footer';
import { ProfileArticle } from '../components/ProfileArticle';
import { WorkArticle } from '../components/WorkArticle';

export default function Home() {
    return (
        <>
            <main>
                <ProfileArticle />
                <WorkArticle />
                <BackToTop />
            </main>
            <Footer />
        </>
    );
}
