import { DashboardLayout } from '../components/dashboard-layout';

function ProfilePage() {
    return <>hello</>;
}

ProfilePage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfilePage;
