function renderer(): void {
    window.addEventListener('DOMContentLoaded', () => {
        alert("Alert from renderer");

        console.log("foobar from renderer");

        console.log(window.electron.process.versions);

        console.log(window.versions.chrome());
    });
}
renderer();