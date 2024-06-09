document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/departments"; // 여기에 실제 API URL을 입력하세요.
    const departmentList = document.getElementById("department-list");

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            data.departments.forEach((department) => {
                const listItem = document.createElement("li");
                listItem.textContent = department.displayName;
                listItem.dataset.id = department.departmentId;
                listItem.addEventListener("click", function () {
                    window.location.href = `./department.html?department-id=${this.dataset.id}`;
                });
                departmentList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching department data:", error);
        });
});
