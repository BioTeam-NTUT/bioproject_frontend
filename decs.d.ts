export {};

declare global {
    interface Window {
        $: JQueryStatic;
        $3Dmol: any;
    }
}
