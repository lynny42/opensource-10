document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
    const departmentList = document.getElementById("department-list");

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            data.departments.forEach((department) => {
                const listItem = document.createElement("li");
                listItem.textContent = department.displayName;
                listItem.dataset.id = department.departmentId;
                listItem.dataset.name = department.displayName;
                listItem.addEventListener("click", function () {
                    const departmentName = encodeURIComponent(this.dataset.name);
                    const departmentId = this.dataset.id;
                    window.location.href = `./image-list.html?department-name=${departmentName}&department-id=${departmentId}`;
                });
                departmentList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching department data:", error);
        });
});
