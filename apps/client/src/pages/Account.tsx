import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { resetCategories } from '../app/slices/categoriesSlice';
import { resetItems } from '../app/slices/itemsSlice';
import {
  deleteUser,
  getUserId,
  resetUser,
  showUser,
  updateUserPassword,
} from '../app/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import ChangePassword from '../components/account/ChangePassword';
import ChangeProfilePicture from '../components/account/ChangeProfilePicture';
import { capitalizeWords } from '../components/utility/functions/capitalizeWord';

const Account = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(showUser);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string | undefined>();
  const [newPassword, setNewpassword] = useState<string | undefined>();
  const [confirmNewPassword, setConfirmNewPassword] = useState<
    string | undefined
  >();
  const [deleteConfirmSentence, setDeleteConfirmSentence] = useState<
    string | undefined
  >(undefined);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [deleteAccountErrorMessage, setDeleteAccountErrorMessage] = useState<
    string | undefined
  >();

  const [changePasswordButtonStatus, setChangePasswordButtonStatus] =
    useState(false);

  const [deleteAccountButtonStatus, setDeleteAccountButtonStatus] =
    useState(true);

  useEffect(() => {
    // 1) check if newPassword and confirmNewPassword is the same
    if (confirmNewPassword && newPassword !== confirmNewPassword) {
      setPasswordErrorMessage('New passwords entered do not match.');
      setChangePasswordButtonStatus(true);
    }
    if (newPassword === confirmNewPassword) {
      setPasswordErrorMessage('');
      setChangePasswordButtonStatus(false);
    }
    // 2) do backend call to check if password is correct and if yes, allow the change of password
  }, [currentPassword, newPassword, confirmNewPassword]);

  useEffect(() => {
    if (deleteConfirmSentence && deleteConfirmSentence !== 'confirm delete') {
      setDeleteAccountErrorMessage(
        'Please enter the correct delete confirmation sentence'
      );
      setDeleteAccountButtonStatus(true);
    }
    if (deleteConfirmSentence === 'confirm delete') {
      setDeleteAccountErrorMessage(undefined);
      setDeleteAccountButtonStatus(false);
    }
  }, [deleteConfirmSentence]);

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordErrorMessage('Please fill in all fields.');
    }
    const data = {
      id: user.id,
      password: currentPassword,
      newPassword: newPassword,
    };
    if (user.email !== 'testUser@hotmail.com') {
      dispatch(updateUserPassword(data))
        .unwrap()
        .then((originalPromiseResult) => {
          toast.success('Your password has been successfully changed!');
          setChangePassword(false);
        })
        .catch((rejectedValueOrSerializedError) => {
          setPasswordErrorMessage(
            rejectedValueOrSerializedError.response.data.error
          );
          setChangePasswordButtonStatus(true);
        });
    } else {
      setPasswordErrorMessage(
        'You are not authorized to change Trial Account Password'
      );
      setChangePasswordButtonStatus(true);
    }
  };

  const handleDeleteAccount = () => {
    if (user.email !== 'testUser@hotmail.com') {
      dispatch(deleteUser(user.id))
        .unwrap()
        .then((originalPromiseResult) => {
          toast.success('Successfully deleted your account');
          dispatch(resetUser());
          dispatch(resetItems());
          dispatch(resetCategories());
          navigate('/');
        })
        .catch((rejectedValueOrSerializedError) => {
          setDeleteAccountErrorMessage(
            rejectedValueOrSerializedError.response.data.error
          );
          setDeleteAccountButtonStatus(true);
        });
    } else {
      setDeleteAccountErrorMessage(
        'You are not authorized to delete our Trial Account'
      );
      setDeleteAccountButtonStatus(true);
    }
  };
  return (
    <div className='flex justify-center'>
      <div className='w-[500px] h-[500px] bg-bgColorPeachBeige rounded-2xl flex flex-col justify-evenly items-center sm:px-[5%] md:px-0'>
        <div className='flex justify-center items-center gap-5'>
          <img className='w-[80px] rounded-full' src={user.image} />
          <div className='text-2xl xl:text-3xl font-lato font-normal text-orange tracking-wider text-center'>
            Hello, {capitalizeWords(user.name)}!
          </div>
        </div>

        <div className='flex gap-5'>
          <div
            className='mr-2 inline-flex justify-center rounded-2xl border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none'
            onClick={() => setChangePassword(true)}
          >
            Change Password
          </div>
          <div
            className='mr-2 inline-flex justify-center rounded-2xl border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white hover:bg-gradient-to-r from-orange to-pink focus:outline-none'
            onClick={() => setDeleteAccount(true)}
          >
            Delete Account
          </div>
        </div>
      </div>
      {/* CHANGE PASSWORD */}
      <Transition appear show={changePassword} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => {
            setChangePassword(false);
            setCurrentPassword(undefined);
            setNewpassword(undefined);
            setConfirmNewPassword(undefined);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md flex gap-3 flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-lg font-medium leading-6 text-red-400'
                  >
                    Would you like to change your password?
                  </Dialog.Title>
                  <input
                    type='password'
                    id='currentPassword'
                    name='currentPassword'
                    value={currentPassword}
                    placeholder='Current Password'
                    autoComplete='off'
                    className='w-[80%] h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  />
                  <input
                    type='password'
                    id='newPassword'
                    name='newPassword'
                    value={newPassword}
                    placeholder='New Password'
                    autoComplete='off'
                    className='w-[80%] h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
                    onChange={(e) => {
                      setNewpassword(e.target.value);
                    }}
                  />
                  <input
                    type='password'
                    id='reconfirmPassword'
                    name='reconfirmPassword'
                    value={confirmNewPassword}
                    placeholder='Reconfirm Password'
                    autoComplete='off'
                    className='w-[80%] h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                    }}
                  />
                  <button
                    type='button'
                    disabled={changePasswordButtonStatus}
                    className='w-[80%] inline-flex justify-center rounded-3xl border border-transparent bg-orange px-4 py-2 text-md font-lato text-white enabled:hover:bg-gradient-to-r from-orange to-pink focus:outline-none disabled:bg-blueGray disabled:bg-opacity-50'
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </button>
                  <div className='text-red-500 italic text-sm'>
                    {passwordErrorMessage}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* DELETE ACCOUNT */}
      <Transition appear show={deleteAccount} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => {
            setDeleteAccount(false);
            setDeleteConfirmSentence(undefined);
            setDeleteAccountErrorMessage(undefined);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md flex gap-3 flex-col items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-lg font-medium leading-6 text-red-500'
                  >
                    All your data will be irreversibly erased.
                  </Dialog.Title>
                  <div className='text-md xl:text-md tracking-wider text-blueGray opacity-50 text-center'>
                    Enter phrase 'confirm delete' and click Delete Account
                    button to execute.
                  </div>
                  <input
                    type='deleteConfirm'
                    id='deleteConfirm'
                    name='deleteConfirm'
                    value={deleteConfirmSentence}
                    placeholder='enter delete phrase here'
                    autoComplete='off'
                    className='w-[80%] h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
                    onChange={(e) => {
                      setDeleteConfirmSentence(e.target.value);
                    }}
                  />
                  <button
                    type='button'
                    disabled={deleteAccountButtonStatus}
                    className='w-[80%] inline-flex justify-center rounded-3xl border border-transparent bg-red-500 px-4 py-2 text-md font-lato text-white enabled:hover:bg-gradient-to-r from-orange to-pink focus:outline-none disabled:bg-blueGray disabled:bg-opacity-50'
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                  <div className='text-red-500 italic text-sm'>
                    {deleteAccountErrorMessage}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>{' '}
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default Account;
