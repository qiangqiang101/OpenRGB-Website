function tabulate(data) {
    var table = d3
        .select("#csvtable")
        .append("table")
        .attr("id", "datatable")
        .attr("class", "table table-bordered table-hover dt-responsive nowrap")
        .attr("cellspacing", 0)
        .attr("style", "width:100%;border-collapse:collapse;");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    thead
        .append("tr")
        .selectAll(null)
        .data(data.shift())
        .enter()
        .append("th")
        .text((d) => d);

    var rows = tbody.selectAll(null).data(data).enter().append("tr");

    rows
        .selectAll(null)
        .data((d) => d)
        .enter()
        .append("td")
        .text((d) => d);

    $("#datatable").DataTable({
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search..."
        },
        lengthMenu: [
            [20, 40, 60, 100, 150, 200, -1],
            [20, 40, 60, 100, 150, 200, "All"]
        ],
    });

    return table;
}

$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    var selectedItem = $("#cmbCategory").val();
    var category = data[1];
    if (selectedItem === "" || category.includes(selectedItem)) {
        return true;
    }
    return false;
});
