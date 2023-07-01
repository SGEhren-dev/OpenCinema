import { Fragment, ReactNode, useState } from "react";
import { Modal as AntdModal, Button } from "antd";

interface IModalProps {
	title: ReactNode;
	content: ReactNode;
	footer?: ReactNode;
	maskClosable?: boolean;
	onModalOk?: () => void;
	onModalCancel?: () => void;
	escToClose?: boolean;
	onOpen?: () => void;
	buttonText: string;
}

export default function Modal(props: IModalProps) {
	const { content, escToClose, onOpen, onModalCancel, onModalOk, buttonText, ...restProps } = props;
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);

	const openModal = () => {
		setModalOpen(true);
		onOpen?.();
	};

	const closeModal = () => {
		setModalOpen(false);
		onModalCancel?.();
	};

	return (
		<Fragment>
			<Button type="primary" onClick={ openModal } onTouchCancelCapture={ closeModal }>
				{ buttonText }
			</Button>
			<AntdModal
				keyboard={ escToClose }
				open={ modalOpen }
				{ ...restProps }
			>
				{ content }
			</AntdModal>
		</Fragment>
	);
}
