import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/16/solid'
import { Fragment } from 'react'

type Props = {
  isOpen: boolean
  handleClose: () => void
  children: JSX.Element
  title: string
  subtitle?: string
}

export default function ModalWarp({
  children,
  title,
  subtitle,
  isOpen,
  handleClose
}: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 bg-gray-700/30" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-background w-fit transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                <button className="absolute top-5 right-5">
                  <XCircleIcon
                    onClick={handleClose}
                    className="w-6 h-6 fill-primary"
                  />
                </button>

                <Dialog.Title className="text-xl font-medium text-lighterAccent">
                  {title}
                </Dialog.Title>

                <p className={`text-sm text-gray-500 mb-5`}>{subtitle}</p>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
