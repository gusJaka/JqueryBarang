$(document).ready(function(){
    // Denotes total number of rows
    var rowIdx = 0;

    // jQuery button click event to add a row
    $('#tambahBarang').click(function () {

        // Adding a row inside the tbody.
        $('#tableRow').append(`
             <tr id="row${++rowIdx}">
                <td class="d-none row-data">
                    <input type="hidden" name="id_barang[]">
                    <input type="hidden" name="ppn_nominal[]">
                    <input type="hidden" name="ppn_persen[]" value="10">
                    <input type="hidden" name="sub_total[]" value="10">
                </td>
                <td class="text-center">
                    <label class="textChange">-</label>
                    <br>
                    <button class="btn btn-success showModal"
                        type="button">Cari Barang</button>
                </td>
                <td class="text-center align-middle">
                    <input type="number" class="form-control" name="harga[]" id="harga" placeholder="0" value="">
                </td>
                <td class="text-center align-middle">
                    <input type="number" class="form-control" name="qty[]" id="qty" placeholder="0" value="">
                </td>
                <td class="text-center align-middle ppn">
                    0
                </td>
                <td class="text-center align-middle subTotal">
                    0
                </td>
                <td class="text-center align-middle">
                    <button class="btn btn-danger remove"
                        type="button">Hapus</button>
                </td>
              </tr>`);

        $(".showModal").click( function(){
            var id= $(this).parents("tr").attr("id");
            $('body').data('id', id);

            $('.barangPilih').click(function () {
                var id_barang = $(this).parents('tr').data('id-barang');
                var nama = $(this).parents('tr').data('nama');
                var index = $('body').data('id');

                $('tr#' + index + ' .textChange').html(nama);
                $('tr#' + index + ' [name="id_barang[]"]').val(id_barang);

                $('#myModal').modal('hide');
            });
        });

        $('[name="qty[]"]').on('change keyup', function () {
            var self = $(this);
            proses_ppn_nominal(self);
            proses_total();
        });
        $('[name="harga[]"]').on('change keyup', function () {
            var self = $(this);
            proses_ppn_nominal(self);
            proses_total();
        });

        $('[name="pembayaran"]').on('change keyup', function () {
            var total = $('[name="total"]').val();
            var pembayaran = $(this).val();
            var kembalian = parseFloat(pembayaran) - parseFloat(total);

            if(kembalian < 0) {
                $('.kembalian').html(0);
            } else {
                $('.kembalian').html(kembalian);
            }

        });
    });

    $("#tableRow").on("click", ".remove", function(){
        $(this).parents("tr").remove();
    });

    $('#tableRow').on('click','.showModal',function (){
        $("#myModal").modal('show');
    });

    function proses_ppn_nominal(self) {
        var index = self.parents('tr').attr('id');
        var harga = $('tr#' + index + ' [name="harga[]"]').val();
        var qty = $('tr#' + index + ' [name="qty[]"]').val();
        var ppn_nominal = (parseFloat(harga) * parseFloat(qty)) * 0.1;
        var sub_total = (parseFloat(harga) * parseFloat(qty)) + parseFloat(ppn_nominal);

        $('tr#' + index + ' [name="ppn_nominal[]"]').val(ppn_nominal);
        $('tr#' + index + ' .ppn').html(ppn_nominal);

        $('tr#' + index + ' [name="sub_total[]"]').val(sub_total);
        $('tr#' + index + ' .subTotal').html(sub_total);
    }

    function proses_total() {
        var total = 0;

        $('#tableRow [name="sub_total[]"]').each(function () {
            var sub_total = $(this).val();

            total = parseFloat(total) + parseFloat(sub_total);
        });

        $('[name="total"]').val(total);
        $('.total').html(total);
    }
});