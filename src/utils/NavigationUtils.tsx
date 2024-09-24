import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationrRef = createNavigationContainerRef();

export async function navigate(routeName: string, params?: object) {
    navigationrRef.isReady();
    if(navigationrRef.isReady()) {
        navigationrRef.dispatch(CommonActions.navigate(routeName, params));
    }
}

export async function replace(routeName: string, params?: object) {
    navigationrRef.isReady();
    if(navigationrRef.isReady()) {
        navigationrRef.dispatch(StackActions.replace(routeName, params));
    }
}


export async function resetAndNavigate(routeName: string) {
    navigationrRef.isReady();
    if(navigationrRef.isReady()) {
        navigationrRef.dispatch(CommonActions.reset(
            {
                index:0,
                routes:[{name: routeName}]
            }
        ));
    }
}

export async function goBack() {
    navigationrRef.isReady();
    if(navigationrRef.isReady()) {
        navigationrRef.dispatch(CommonActions.goBack());
    }
}


export async function push(routeName:string, params?:object) {
    navigationrRef.isReady();
    if(navigationrRef.isReady()) {
        navigationrRef.dispatch(StackActions.push(routeName, params));
    }
}


export async function prepareNavigation() {
    navigationrRef.isReady();
}
