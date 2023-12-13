function renderer(): void {
    window.addEventListener('DOMContentLoaded', () => {
        alert("Alert from renderer");
    });
}
renderer();