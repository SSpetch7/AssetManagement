import UserInfo from 'components/UserInfo';
import AddUser from 'components/AddUser';
import BorrowButton from 'components/BorrowButton';
import AdminProfile from 'components/AdminProfile';
import AddAdmin from 'components/AddAdmin';

export default function BasicDemo() {
  return (
    <div className="card">
      <div class="flex ">
        <div class="flex-none w-14 h-14 border-1 bg-kmuttColor-800">01</div>
        <UserInfo />
        <div class="flex-initial w-32 border-1">02</div>
        <AddUser />
        <div class="flex-initial w-32 border-1">03</div>
        <BorrowButton />
        <div class="flex-initial w-32 border-1">03</div>
        <AdminProfile />
        <div class="flex-initial w-32 border-1">03</div>
        <AddAdmin />
      </div>
    </div>
  );
}
