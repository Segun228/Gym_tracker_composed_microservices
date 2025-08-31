import {
    Panel,
    PanelSpinner,
} from '@vkontakte/vkui';
import { authorize } from '../api/auth/authorize';

const LoginPanel = ({id}) => {
    useEffect(() => {
        authorize()
    }, []);
    return ( 
    <Panel id ={id}>
        <PanelSpinner size='l' />
        <div>something</div>
    </Panel>);
}

export default LoginPanel;