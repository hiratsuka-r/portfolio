import { ProfileArticle } from '../components/ProfileArticle';
import { BackToTop } from '../components/BackToTop';
import { WorkArticle } from '../components/WorkArticle';

export default function Home() {
    return (
        <main>
            <ProfileArticle />
            <WorkArticle />
            <BackToTop />
        </main>
    );
}
