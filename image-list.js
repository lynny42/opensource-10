const helper = {
  //   helper functions
  getObjectsIdsUrl: (departmentId) =>
    `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`,
  getObjectUrl: (objectId) =>
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
  // util functions
  $: document.querySelector.bind(document),
  use: (url) =>
    fetch(url)
      .then((res) => res.json())
      .catch(() => {
        console.log("일시적으로 페이지를 사용할 수 없습니다.");
        window.location.href = "./main.html";
      }),
  iife: (fn) => fn(),
};
const constants = helper.iife(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const departmentName = searchParams.get("department-name");
  const departmentId = searchParams.get("department-id");
  return { departmentName, departmentId };
});
