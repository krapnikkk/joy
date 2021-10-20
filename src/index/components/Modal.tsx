import * as React from 'react'
import { Modal } from 'antd';
import { inject, observer } from 'mobx-react'
import emitter from "@event/index";
import { EVENT_UPDATE_INFO, EXTENSION_VERSION } from '@src/constants';


interface IState {
    visible: boolean;
    content: string;
    force: boolean;
}


@inject('AppStore')
@observer
export default class ModalComponent extends React.Component<IProps, IState, {}>  {
    constructor(props: IProps | Readonly<IProps>) {
        super(props);
        this.state = {
            visible: false,
            content: "",
            force: false
        };
    }

    componentWillMount() {
        emitter.on(EVENT_UPDATE_INFO, () => {
            this.loadInfoData();
        })
    }

    loadInfoData() {
        let { info } = this.props.AppStore;
        let { verison, download, content } = info;
        let force = verison > EXTENSION_VERSION;
        if (force) {
            content = download;
        }
        this.setState({
            visible: true,
            force,
            content
        })
    }

    render() {
        return (
            <Modal title="温馨提示"
                visible={this.state.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                okButtonProps={{ disabled: this.state.force }}
                cancelButtonProps={{ disabled: this.state.force }}
            >
                {
                    this.state.content
                }
            </Modal>
        )
    }

    handleOk() {
        this.close();
    }

    handleCancel() {
        this.close();
    }

    close() {
        if (!this.state.force) {
            this.setState({
                visible: false
            })
        }
    }
}